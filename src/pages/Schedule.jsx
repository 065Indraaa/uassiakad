import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/Layout';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState({ teacherId: '', subject: '', time: '' });
  const [isEditing, setIsEditing] = useState(false);

  const scheduleCollectionRef = collection(db, 'schedule');
  const teachersCollectionRef = collection(db, 'teachers');

  useEffect(() => {
    const getSchedule = async () => {
      const data = await getDocs(scheduleCollectionRef);
      setSchedule(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getTeachers = async () => {
      const data = await getDocs(teachersCollectionRef);
      setTeachers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getSchedule();
    getTeachers();
  }, [scheduleCollectionRef, teachersCollectionRef]);

  const handleClickOpen = (scheduleItem) => {
    if (scheduleItem) {
      setIsEditing(true);
      setCurrentSchedule(scheduleItem);
    } else {
      setIsEditing(false);
      setCurrentSchedule({ teacherId: '', subject: '', time: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (isEditing) {
      const scheduleDoc = doc(db, 'schedule', currentSchedule.id);
      const scheduleData = { ...currentSchedule };
      delete scheduleData.id;
      await updateDoc(scheduleDoc, scheduleData);
    } else {
      await addDoc(scheduleCollectionRef, currentSchedule);
    }
    handleClose();
    const data = await getDocs(scheduleCollectionRef);
    setSchedule(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleDelete = async (id) => {
    const scheduleDoc = doc(db, 'schedule', id);
    await deleteDoc(scheduleDoc);
    setSchedule(schedule.filter((item) => item.id !== id));
  };

  const getTeacherName = (teacherId) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    return teacher ? teacher.name : 'Unknown Teacher';
  };

  return (
    <Layout title="Schedule">
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Button variant="contained" onClick={() => handleClickOpen(null)} sx={{ mb: 2, alignSelf: 'flex-start' }}>Add Schedule</Button>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Teacher</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Time</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{getTeacherName(item.teacherId)}</TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleClickOpen(item)} sx={{ mr: 1 }}>Edit</Button>
                    <Button onClick={() => handleDelete(item.id)} color="secondary">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isEditing ? 'Edit Schedule' : 'Add Schedule'}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel>Teacher</InputLabel>
              <Select value={currentSchedule.teacherId} onChange={(e) => setCurrentSchedule({ ...currentSchedule, teacherId: e.target.value })} label="Teacher">
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>{teacher.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField margin="dense" label="Subject" type="text" fullWidth value={currentSchedule.subject} onChange={(e) => setCurrentSchedule({ ...currentSchedule, subject: e.target.value })} />
            <TextField margin="dense" label="Time" type="text" fullWidth value={currentSchedule.time} onChange={(e) => setCurrentSchedule({ ...currentSchedule, time: e.target.value })} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Layout>
  );
};

export default Schedule;
