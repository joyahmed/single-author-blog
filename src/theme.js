import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#6266be'
		}
	},
	background: {
		default: '#fff'
	},
	MuiContainer: {
		root: {
			maxWidth: '100vw'
		}
	},
	// ...other code,
	overrides: {
		// ...
		MuiOutlinedInput: {
			focused: {
				border: '1px solid #4A90E2'
			},
			'& $notchedOutline': {
				border: '1px solid #4A90E2'
			}
		}
		// ...
	}
});

export default theme;
