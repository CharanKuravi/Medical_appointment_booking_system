import { useState, useRef, useCallback, useEffect } from 'react';
import io from 'socket.io-client';

const useWebRTC = (roomId) => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    const socketRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const localStreamRef = useRef(null);

    const configuration = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' }
        ]
    };

    // Create peer connection
    const createPeerConnection = useCallback(() => {
        const pc = new RTCPeerConnection(configuration);

        pc.onicecandidate = (event) => {
            if (event.candidate && socketRef.current) {
                socketRef.current.emit('ice-candidate', {
                    candidate: event.candidate,
                    to: socketRef.current.targetSocketId
                });
            }
        };

        pc.ontrack = (event) => {
            console.log('Received remote track');
            setRemoteStream(event.streams[0]);
            setIsConnected(true);
        };

        pc.onconnectionstatechange = () => {
            console.log('Connection state:', pc.connectionState);
            if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
                setIsConnected(false);
                setRemoteStream(null);
            }
        };

        return pc;
    }, []);

    // Join room function
    const joinRoom = useCallback(async (userId, role) => {
        try {
            // Get local media stream
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            setLocalStream(stream);
            localStreamRef.current = stream;

            // Initialize socket connection
            socketRef.current = io('http://localhost:5000', {
                transports: ['websocket']
            });

            socketRef.current.on('connect', () => {
                console.log('Socket connected');
                socketRef.current.emit('join-room', { roomId, userId, role });
            });

            socketRef.current.on('existing-users', async (users) => {
                console.log('Existing users:', users);
                if (users.length > 0) {
                    // Create offer for first user
                    socketRef.current.targetSocketId = users[0].socketId;
                    const pc = createPeerConnection();
                    peerConnectionRef.current = pc;

                    // Add local tracks
                    stream.getTracks().forEach(track => {
                        pc.addTrack(track, stream);
                    });

                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);
                    
                    socketRef.current.emit('offer', {
                        offer: offer,
                        to: users[0].socketId
                    });
                }
            });

            socketRef.current.on('user-joined', async ({ socketId }) => {
                console.log('User joined:', socketId);
                socketRef.current.targetSocketId = socketId;
            });

            socketRef.current.on('offer', async ({ offer, from }) => {
                console.log('Received offer from:', from);
                socketRef.current.targetSocketId = from;

                const pc = createPeerConnection();
                peerConnectionRef.current = pc;

                // Add local tracks
                stream.getTracks().forEach(track => {
                    pc.addTrack(track, stream);
                });

                await pc.setRemoteDescription(new RTCSessionDescription(offer));
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);

                socketRef.current.emit('answer', {
                    answer: answer,
                    to: from
                });
            });

            socketRef.current.on('answer', async ({ answer }) => {
                console.log('Received answer');
                if (peerConnectionRef.current) {
                    await peerConnectionRef.current.setRemoteDescription(
                        new RTCSessionDescription(answer)
                    );
                }
            });

            socketRef.current.on('ice-candidate', async ({ candidate }) => {
                if (peerConnectionRef.current && candidate) {
                    try {
                        await peerConnectionRef.current.addIceCandidate(
                            new RTCIceCandidate(candidate)
                        );
                    } catch (err) {
                        console.error('Error adding ICE candidate:', err);
                    }
                }
            });

            socketRef.current.on('user-left', () => {
                console.log('User left');
                setRemoteStream(null);
                setIsConnected(false);
                if (peerConnectionRef.current) {
                    peerConnectionRef.current.close();
                    peerConnectionRef.current = null;
                }
            });

        } catch (err) {
            console.error('Error joining room:', err);
            setError('Failed to access camera/microphone. Please grant permissions.');
            throw err;
        }
    }, [roomId, createPeerConnection]);

    // Send data through data channel
    const sendData = useCallback((data) => {
        // For now, we'll use socket.io for data
        if (socketRef.current && isConnected) {
            socketRef.current.emit('data-message', data);
        }
    }, [isConnected]);

    // Toggle audio
    const toggleAudio = useCallback(() => {
        if (localStreamRef.current) {
            const audioTrack = localStreamRef.current.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                return audioTrack.enabled;
            }
        }
        return false;
    }, []);

    // Toggle video
    const toggleVideo = useCallback(() => {
        if (localStreamRef.current) {
            const videoTrack = localStreamRef.current.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                return videoTrack.enabled;
            }
        }
        return false;
    }, []);

    // Leave room
    const leaveRoom = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.emit('leave-room');
            socketRef.current.disconnect();
        }
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
            localStreamRef.current = null;
        }
        setLocalStream(null);
        setRemoteStream(null);
        setIsConnected(false);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            leaveRoom();
        };
    }, [leaveRoom]);

    return {
        localStream,
        remoteStream,
        isConnected,
        error,
        joinRoom,
        leaveRoom,
        sendData,
        toggleAudio,
        toggleVideo
    };
};

export default useWebRTC;
