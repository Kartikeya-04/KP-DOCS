import React from 'react';
import { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './style.css';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

function Editor() {
  // Define the toolbar options for the Quill editor
  const TOOL = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [
      {
        color: [
          'blue',
          'black',
          'orange',
          'pink',
          'red',
          'yellow',
          'green',
          'purple',
        ],
      },
      { background: ['white', 'grey', 'yellow', '#4CB9E7', 'aliceblue'] },
    ],
    [{ script: 'sub' }, { script: 'super' }],
    [{ align: [] }],
    ['image', 'blockquote', 'code-block'],

    ['clean'],
  ];

  // Get the document ID from the URL parameters
  const { id: documentId } = useParams();

  // State variables for the socket connection and Quill editor instance
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  // Initialize the Quill editor when the component mounts

  useEffect(() => {
    return () => {
      const q = new Quill('.try', {
        theme: 'snow',
        modules: { toolbar: TOOL },
      });

      setQuill(q);
    };
  }, []);

  // Connect to the server using socket.io when the component mounts
  useEffect(() => {
    const s = io('http://localhost:3001');
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  // Load the document content from the server when the socket connection is established

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once('load-document', (document) => {
      quill.setContents(document);
      quill.enable();
    });
    socket.emit('get-document', documentId);
  }, [socket, quill, documentId]);

  // Periodically save the document content to the server

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents());
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  // Receive changes made by other users and update the editor content
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler);
    };
  }, [socket, quill]);

  // Send changes made by the current user to other users
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };
    quill.on('text-change', handler);

    return () => {
      quill.off('text-change', handler);
    };
  }, [socket, quill]);

  //main
  // Render the Quill editor component
  return (
    <div className="try">
      <h3>Type here ....</h3>
    </div>
  );
}

export default Editor;
