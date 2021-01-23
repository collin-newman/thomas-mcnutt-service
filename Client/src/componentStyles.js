import { styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const StyledBtn = styled(Button)({
  marginLeft: 'auto',
  marginRight: '0',
  backgroundColor: 'black',
  color: 'white',
  textTransform: 'none',
  borderRadius: '25px',
  float: 'right',
  height: '40px',
  width: '120px',
  'font-size': '1.1rem',
});

const StyledImg = styled(Avatar)({
  height: '100px',
  width: '100px',
});

const StyledMainImg = styled(Avatar)({
  height: '200px',
  width: '400px',
});

const StyledDoc = styled(Grid)({
  padding: '50px',
  'background-color': '#f9f2ea',
});
const StyledRoot = styled(Grid)({
  'background-color': '#f9f2ea',
  'font-family': 'poppins',
});

const StyledWhatTravellers = styled(Grid)({
  'font-size': '2rem',
});

const RatingBubbles = styled(Grid)({
  color: 'rgb(52, 224, 161)',
  float: 'left',
});

const ReviewStayRight = styled(Grid)({
  float: 'right',
  'font-size': '1.5rem',
});

export {
  StyledImg, StyledMainImg, StyledRoot, StyledBtn,
  StyledDoc, StyledWhatTravellers, RatingBubbles, ReviewStayRight,
};
