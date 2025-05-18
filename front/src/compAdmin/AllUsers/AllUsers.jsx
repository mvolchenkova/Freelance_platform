import React, { useEffect, useState } from 'react';
import { fetchUsers, BlockUser } from '../../store/Slices/userSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Input, Modal, Typography, TextField } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { createFine } from '../../store/Slices/fineSlice';


const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users.data || []);
    const status = useSelector((state) => state.users.status);
    const error = useSelector((state) => state.users.error);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [warnModalOpen, setWarnModalOpen] = useState(false);
    const [warnUser, setWarnUser] = useState(null); //  Храним пользователя, для которого открыто модальное окно
    const [warnMessage, setWarnMessage] = useState('');


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  useEffect(() => {
    const filtered = users.filter((user) => {
      const loginMatch = user.login.toLowerCase().includes(searchTerm.toLowerCase());
      const emailMatch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
      return loginMatch || emailMatch;
    });
    setFilteredUsers(filtered);
  }, [searchTerm, users]);
  const handleBlock = (userId) => {
    dispatch(BlockUser(userId)).then(() => dispatch(fetchUsers())); // Обновляем список после блокировки
  };
  const isAdmin = currentUser?.user?.role === 'admin';
if (!isAdmin) {
   return <Navigate to="/" replace />;
}

  if (status === 'loading' || !status) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    );
  }

  if (status === 'rejected' || status === 'failed') {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4" role="alert">
        <strong className="font-bold">Error loading users:</strong>
        <span className="block sm:inline">{error || "An unknown error occurred."}</span>
      </div>
    );
  }
  const handleWarnOpen = (user) => {
    setWarnUser(user);
    setWarnModalOpen(true);
};

const handleWarnClose = () => {
    setWarnModalOpen(false);
    setWarnUser(null);
    setWarnMessage(''); //  Очищаем сообщение после закрытия
};

const handleWarnSubmit = async () => {
    try {
        await dispatch(createFine({
            idUser: warnUser.idUser,
            Reason: warnMessage,  // Note uppercase 'R' to match model
            Cost: "0.00"         // Send as string if your backend expects DECIMAL
        }));
        console.log("Warning sent successfully");
        handleWarnClose();
    } catch (error) {
        console.error("Error sending warning:", error);
    }
};
  return (
    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"100px",width:"100%",gap:"20px"}}>
        <Input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        
      />
      {filteredUsers.map((user) => (
        <Box key={user.idUser} sx={{width:"70%",borderRadius:"30px", display:"flex",justifyContent:"space-between",flexDirection:"row",backgroundColor:"rgb(238,232,221)",margin:"5px 0 5px 0",padding:"0 10px 0 10px"}}>
          <Box sx={{width:"50%",display:"flex",alignItems:"center",gap:"10px"}}>
            <h2 className="text-xl font-semibold">{user.login}</h2>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">
              Status: {user.isBlocked ? 'Blocked' : 'Active'}
            </p>
          </Box>

          {user.role !== "admin" && ( //  Кнопки только для не-админов и если текущий пользователь - админ
            <Box sx={{display:"flex",alignItems:"center",gap:"5px"}}> {/*  Расположение кнопок */}
              <Button
                onClick={() => handleBlock(user.idUser)}
                sx={{color:"black"}}
              >
                {user.isBlocked ? "Unblock" : "Block"} {/* Меняем текст кнопки */}
              </Button>
              <Button onClick={() => handleWarnOpen(user)} sx={{color:"black"}}>Warn</Button>
            </Box>
          )}
        </Box>
      ))}
      <Modal
          open={warnModalOpen}
          onClose={handleWarnClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2, //  For rounded corners
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Warn {warnUser?.login}
            </Typography>
            <TextField
              id="warn-message"
              label="Warning Message"
              multiline
              rows={4}
              value={warnMessage}
              onChange={(e) => setWarnMessage(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button onClick={handleWarnSubmit} variant="contained" color="primary">
              Send Warning
            </Button>
          </Box>
        </Modal>
    </Box>
  );
};

export default UserList;