import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/Layout';
import { Grid, Paper, Typography } from '@mui/material';

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [scheduleCount, setScheduleCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const studentsCollectionRef = collection(db, 'students');
      const teachersCollectionRef = collection(db, 'teachers');
      const scheduleCollectionRef = collection(db, 'schedule');

      const studentData = await getDocs(studentsCollectionRef);
      const teacherData = await getDocs(teachersCollectionRef);
      const scheduleData = await getDocs(scheduleCollectionRef);

      setStudentCount(studentData.size);
      setTeacherCount(teacherData.size);
      setScheduleCount(scheduleData.size);
    };
    fetchData();
  }, []);

  return (
    <Layout title="Dashboard">
      <Grid container spacing={3}>
        {/* Student Count */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Students
            </Typography>
            <Typography component="p" variant="h4">
              {studentCount}
            </Typography>
          </Paper>
        </Grid>
        {/* Teacher Count */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Teachers
            </Typography>
            <Typography component="p" variant="h4">
              {teacherCount}
            </Typography>
          </Paper>
        </Grid>
        {/* Schedule Count */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Classes
            </Typography>
            <Typography component="p" variant="h4">
              {scheduleCount}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
