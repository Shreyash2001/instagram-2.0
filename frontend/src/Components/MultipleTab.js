import * as React from 'react';
import "./MultipleTab.css";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MultipleTab({mutual}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs TabIndicatorProps={{ sx: { backgroundColor: "#FF4949"}}}  value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Mutual" style={{color: "#FF4949", fontSize:"14px", textTransform:"inherit"}} {...a11yProps(0)} />
          <Tab label="Top" style={{color: "#FF4949", fontSize:"14px", textTransform:"inherit"}} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel className="multipleTab__itemOne" value={value} index={0}>
        {mutual?.map((user) => (
          <img className="multipleTab__image" src={user?.profilePic} alt={user?.userName} />
        ))}
      </TabPanel>
      <TabPanel className="multipleTab__itemOne" value={value} index={1}>
      <img className="multipleTab__image" src="https://s3.amazonaws.com/photos.bcheights.com/wp-content/uploads/2019/10/03123602/peaky-blinders-online.jpg" alt="feed" />
          <img className="multipleTab__image" src="https://deadline.com/wp-content/uploads/2020/07/batman-e1615677263885.jpg?w=1024" alt="feed"  />
          <img className="multipleTab__image" src="https://static01.nyt.com/images/2021/03/11/arts/11nft-explain-1/11nft-explain-1-mediumSquareAt3X.jpg" alt="feed"  />
          <img className="multipleTab__image" src="https://static3.srcdn.com/wordpress/wp-content/uploads/2020/09/House-of-the-Dragon-Title.jpg" alt="feed"  />
      </TabPanel>
    </Box>
  );
}