import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSupports,
  updateSupport,
  createSupport
} from '../../store/Slices/supportSlice';
import { fetchUsers } from '../../store/Slices/userSlicer';
import { Box, Button } from '@mui/material';

export default function Support() {
  const dispatch = useDispatch();
  const { supports = {}, status, error } = useSelector((state) => state.support);
  const user = JSON.parse(localStorage.getItem('currentUser'));
const users = useSelector((state) => state.users.users.data || []);

  const userId = user?.user?.id
  const [newQuestion, setNewQuestion] = useState('');
  const [responses, setResponses] = useState({});

  useEffect(() => {
    dispatch(fetchSupports());
  }, [dispatch]);

  useEffect(() => {
  dispatch(fetchUsers());
}, [dispatch]);

  useEffect(() => {
    console.log('Supports data:', supports);
  }, [supports]);

  const handleResponseChange = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitResponse = (id) => {
    const responseText = responses[id];
    if (!responseText || responseText.trim() === '') return;

    dispatch(updateSupport({ id, data: { answer: responseText } }));
    alert('Answer is sent');
    setResponses((prev) => ({ ...prev, [id]: '' }));
    window.location.reload();
  };

  const handleAskQuestion = () => {
    
    const payload={
        question:newQuestion,
       timeOfAsk: new Date().toISOString(),
       UserIdUser : userId
    }
      
   
    console.log('Sending payload:', payload);
    dispatch(createSupport(payload));
    alert('Your question has been sent!');
    setNewQuestion('');
  };
  

  if (status === 'loading') return <p>Loading support requests...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;


  return (
    <Box sx={{display:"flex", flexDirection:"column",alignItems:"center",width:"100%"}}>
      <h2>Support Requests</h2>
        <Box sx={{display:"flex",gap: "10px",width:"100%",flexWrap:"wrap",justifyContent:"center"}}>
      {user?.user?.role === 'admin' ? (
        supports.length === 0 ? (
          <p>No support records found.</p>
        ) : (
          supports
  .filter(record => !record.answer) // скрыть уже отвеченные
  .map((record) => {
    const userData = users.find(u => u.idUser == Number(record.UserIdUser));   
    
    return (
      <Box key={record.idSupport} sx={{width:"13%",display:"flex",flexDirection:"column",backgroundColor:"white", padding:"10px 10px 10px 10px",borderRadius:"10px"}}>
        <p><strong>Name:</strong> {userData?.login || 'Unknown'}</p>
        <p><strong>Email:</strong> {userData?.email || 'Unknown'}</p>
        <p><strong>Message:</strong> {record.question}</p>
    

        <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
          <textarea
            rows={3}
            placeholder="Write your response..."
            value={responses[record.idSupport] || ''}
            onChange={(e) =>
              handleResponseChange(record.idSupport, e.target.value)
            }
          />
          
        </Box>
        <Button onClick={() => handleSubmitResponse(record.idSupport)}>
            Send Response
          </Button>
          
      </Box>
    );
  })

        )
      ) : (
        // 👤 Regular user view: only show form to ask questions
        <Box sx={{width:"60%",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <p>You can ask your question below:</p>
            <textarea
                rows={10}
                cols={50}
                placeholder="Enter your question..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
            />
            <Button sx={{color:"black"}} onClick={handleAskQuestion}>Send Question</Button>
        </Box>
      )}
      </Box>
    </Box>
  );
}
