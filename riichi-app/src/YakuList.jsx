import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import YakuItem from './YakuItem.jsx'
import Item from './Item.jsx'
import YAKUS from './Yakus.jsx'
//import YAKUCOLORS from './Colors.jsx'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import NativeSelect from '@mui/material/NativeSelect';

function YakuList({ mini, english, setEnglish, yakuTab, setYakuTab, lightTheme, simpleMode}) {
  function getColor(cssVar) {
    const style = window.getComputedStyle(document.body);
    return style.getPropertyValue('--' + cssVar);
  }

  const YAKUCOLORS = {
    gameplay: getColor("purple_mid"),
    closed: getColor("blue_light"),
    penalty: getColor("blue_mid"),
    open: getColor("blue_dark"),
    closedyakuman: getColor("red_mid"),
    openyakuman: getColor("red_dark"),
    lucky: getColor("yellow_mid"),
    luckyyakuman: getColor("yellow_dark"),
    special: getColor("green_mid"),
    closedhan: getColor("gray_light"),
    openhan: getColor("gray_dark"),
    anyhan: getColor("gray_mid"),
    text: getColor("text"),
  }

  const [accordionItems, setAccordionItems] = useState(null);
  const handleTabChange = (event, newValue) => {
    console.log(newValue)
    console.log(typeof newValue)
    setYakuTab(newValue);
  };

  const handleSwitchChange = (event) => {
    setEnglish(event.target.checked);
  };

  const handleDropChange = (event) => {
    setYakuTab(Number(event.target.value));
  };

  const tabMenuSimple = (
    <Tabs value={yakuTab} onChange={handleTabChange} sx={{ marginBottom: "20px" }} centered textColor={(lightTheme === "light" ? "#434343" : "#f5f5f5" )}>
      <Tab label="Beginner" />
      <Tab label="Intermediate" />
      <Tab label="All" />
      <Tab label="Standard" />
      <Tab label="Open" />
      <Tab label="Yakuman" />
      <Tab label="Rare" />
    </Tabs>
  )

  const tabMenu = (
  <Tabs value={yakuTab} onChange={handleTabChange} sx={{ marginBottom: "20px" }} centered textColor={(lightTheme === "light" ? "#434343" : "#f5f5f5" )}>
    <Tab label="All" />
    <Tab label="Standard" />
    <Tab label="Open" />
    <Tab label="Yakuman" />
    <Tab label="Rare" />
  </Tabs>
  )

  const dropMenuSimple = (
    <NativeSelect value={yakuTab} onChange={handleDropChange} sx={{ marginBottom: "20px", padding: "10px", borderRadius: "8px", backgroundColor: (lightTheme === "light" ? "white" : "#f5f5f5" ) }}>
      <option value={0}>Beginner</option>
      <option value={1}>Intermediate</option>
      <option value={2}>All</option>
      <option value={3}>Standard</option>
      <option value={4}>Open</option>
      <option value={5}>Yakuman</option>
      <option value={6}>Rare</option>
    </NativeSelect>
  )

  const dropMenu = (
    <NativeSelect value={yakuTab} onChange={handleDropChange} sx={{ marginBottom: "20px", padding: "10px", borderRadius: "8px", backgroundColor: (lightTheme === "light" ? "white" : "#f5f5f5" ) }}>
      <option value={2}>All</option>
      <option value={3}>Standard</option>
      <option value={4}>Open</option>
      <option value={5}>Yakuman</option>
      <option value={6}>Rare</option>
    </NativeSelect>
  )

  const simpleModeAdd = (!mini && simpleMode == 3) ? 2 : 0

  useEffect(() => {
    const items = (<>
      {YAKUS.map((yaku) => (
          <YakuItem mini={mini} yaku={yaku} english={english} yakuTab={yakuTab + simpleModeAdd} lightTheme={lightTheme}/>
        ))}
    </>)

    setAccordionItems(items);

  }, [yakuTab, english, lightTheme]);

  return (
    <>
      <h1>Yaku List</h1>
      {mini ? ((simpleMode == 3) ? dropMenu : dropMenuSimple) : ((simpleMode == 3) ? tabMenu : tabMenuSimple)}
      <p>Winning hands <b>must</b> contain at least 1 <b>Yaku</b> to be valid.</p>
      <div className='yaku-list'>
        <Grid container spacing={2} alignItems="center" sx={{ margin: "12px 0", padding: "0 16px" }}>
          <Grid size={mini ? 6 : 8}>
            <FormGroup sx={{ padding: "0 16px" }}>
              <FormControlLabel control={
                <Switch
                  checked={english}
                  onChange={handleSwitchChange}
                  slotProps={{ input: { 'aria-label': 'controlled' } }}
                />
              } label="English Names" />
            </FormGroup>
          </Grid>
          <Grid size={mini ? 3 : 2}>
            <Item sx={{ fontWeight: "bold", backgroundColor: (lightTheme === "light" ? "#ffffff" : "#999999" ), color: (lightTheme === "light" ? "black" : "white" ) }}>Closed</Item>
          </Grid>
          <Grid size={mini ? 3 : 2}>
            <Item sx={{ fontWeight: "bold", backgroundColor: (lightTheme === "light" ? "#f5f5f5" : "#434343" ), color: (lightTheme === "light" ? "black" : "white" ) }}>Open</Item>
          </Grid>
        </Grid>
        {!accordionItems ? <h1>Loading...</h1> : accordionItems}
      </div>
    </>
  )
}

export default YakuList
