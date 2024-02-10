import React from 'react';
import { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './style.css';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
function Editor() {
  const TOOL = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ align: [] }],
    ['image', 'blockquote', 'code-block'],
    ['clean'],
  ];
  // var all;
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  useEffect(() => {
    return () => {
      const q = new Quill('.try', {
        theme: 'snow',
        modules: { toolbar: TOOL },
      });

      setQuill(q);
    };
  }, []);

  //2
  useEffect(() => {
    const s = io('http://localhost:3001');
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  //3

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once('load-document', (document) => {
      quill.setContents(document);
      quill.enable();
    });
    socket.emit('get-document', documentId);
  }, [socket, quill, documentId]);

  //4

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents());
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);
  //5
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
  //6
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

  // useEffect(() => {
  //   // Assuming 'quill' is your Quill instance
  //   if (quill) {
  //     socket.on('all-content', (data) => {
  //       console.log(data.ops);
  //       all.push(data);
  //       all.map((a) => a.ops);
  //     });
  //     socket.emit('send-req', 'go');
  //   } else {
  //     console.error(
  //       'Invalid Quill container. Make sure Quill is properly initialized.'
  //     );
  //   }
  // }, [quill, socket]);

  //main
  return (
    <div className="try">
      <h3>Type here ....</h3>
    </div>
  );
}

export default Editor;

//
