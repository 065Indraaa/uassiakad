import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const MainListItems = ({ role }) => (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    
    {role === 'admin' && (
      <>
        <ListItemButton component={Link} to="/students">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Students" />
        </ListItemButton>
        <ListItemButton component={Link} to="/teachers">
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Teachers" />
        </ListItemButton>
      </>
    )}

    {(role === 'admin' || role === 'guru') && (
      <ListItemButton component={Link} to="/grades">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Grades" />
      </ListItemButton>
    )}

    {role === 'siswa' && (
      <ListItemButton component={Link} to="/grades">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="My Grades" />
      </ListItemButton>
    )}

    <ListItemButton component={Link} to="/schedule">
      <ListItemIcon>
        <CalendarTodayIcon />
      </ListItemIcon>
      <ListItemText primary="Schedule" />
    </ListItemButton>
    
    <ListItemButton component={Link} to="/profile">
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
  </React.Fragment>
);
