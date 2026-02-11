import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchReports,
  createReport,
  updateReport
} from '../../store/Slices/reportSlice';
import { fetchUsers } from '../../store/Slices/userSlicer';
import { Button,Box } from '@mui/material';

export default function ReportComp() {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const role = currentUser?.user?.role;
  const userId = currentUser?.user?.id;

  const { reports } = useSelector((state) => state.report);
  const users = useSelector((state) => state.users.users.data || []);

  const [targetUserId, setTargetUserId] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (role === 'admin') {
      dispatch(fetchReports());
    }
    dispatch(fetchUsers());
  }, [dispatch, role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (targetUserId && description) {
      dispatch(createReport({
        idReportedByUser: userId,
        idReportedUser: targetUserId,
        Reason:description
      }));
      setDescription('');
      setTargetUserId('');
    }
  };

 const handleView = (id) => {
  dispatch(updateReport({ id, data: { Status: 'viewed' } }));
};

const handleDeny = (id) => {
  dispatch(updateReport({ id, data: { Status: 'denied' } }));
};
// if (!reports.Status) {
//     return null;
//   }

  if (role === 'admin') {
    return (
      <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <h2>All Reports</h2>
        <Box sx={{display:"flex",gap:"10px",flexWrap:"wrap",marginTop:"50px"}}>
        {reports
          .filter(report => !report.Status) // только необработанные
          .map((report) => {
            const reporter = users.find(u => u.idUser === report.idReportedByUser);
            const reported = users.find(u => u.idUser === report.idReportedUser);
            return (
              <Box key={report.idReport} sx={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px 10px 10px 10px',width:"300px",borderRadius:"10px",backgroundColor:"white" }}>
                <p><strong>From:</strong> {reporter?.login || report.idReportedByUser}</p>
                <p><strong>Against:</strong> {reported?.login || report.idReportedUser}</p>
                <p><strong>Reason:</strong> {report.Reason}</p>
                <Button sx={{backgroundColor:"green", color:"black", margin:"3px 3px 3px 3px"}} onClick={() => handleView(report.idReport)}>View</Button>
                <Button sx={{backgroundColor:"red", color:"black", margin:"3px 3px 3px 3px"}} onClick={() => handleDeny(report.idReport)}>Deny</Button>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }

  return (
    <div style={{ maxWidth: '400px' }}>
      <h2>Submit a Report</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Report user:
          <select
            value={targetUserId}
            onChange={(e) => setTargetUserId(e.target.value)}
            required
          >
            <option value="">-- Select User --</option>
            {users
              .filter(u => u.idUser !== userId) // can't report yourself
              .map((user) => (
                <option key={user.idUser} value={user.idUser}>
                  {user.login}
                </option>
              ))}
          </select>
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}
