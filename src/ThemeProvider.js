import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import PropTypes from 'prop-types';
import React from 'react';
import { defaultRed } from './colors';

const themeColors = {
  orange: {
    primary: { main: '#616161', contrastText: '#ffffff' },
    secondary: { main: '#f99f1f', contrastText: '#ffffff' },
    menu: {
      breadcrumbContrastText: '#ffffff',
    },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  black: {
    primary: { main: '#000000', light: '#323232', contrastText: '#ffffff' },
    secondary: { main: '#e31c1c', contrastText: '#ffffff' },
    menu: {
      breadcrumbContrastText: '#ffffff',
    },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  redLight: {
    primary: { main: '#2a2a2a', light: '#cbcbcb', contrastText: '#ffffff' },
    secondary: { main: '#e20000', contrastText: '#ffffff' },
    menu: {
      breadcrumbContrastText: '#000',
    },
    error: {
      main: defaultRed,
      contrastText: '#ffffff',
    },
  },
  green: {
    primary: { main: '#0b6836', light: '#989ea5', contrastText: '#ffffff' },
    secondary: { main: '#000000', contrastText: '#ffffff' },
    menu: {
      breadcrumbContrastText: '#ffffff',
    },
  },
  blue: {
    primary: blue,
  },
};

const theme = variant =>
  createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    spacing: {
      unit: 12,
    },
    overrides: {
      MuiCollapse: {
        entered: {
          height: 'auto',
          overflow: 'visible',
        },
      },
    },
    palette: { ...themeColors[variant] },
  });
export function ThemeProvider({ children, variant }) {
  return <MuiThemeProvider theme={theme(variant)}>{children}</MuiThemeProvider>;
}
export default ThemeProvider;
ThemeProvider.propTypes = {
  variant: PropTypes.oneOf(['orange', 'blue', 'black', 'redLight', 'green'])
    .isRequired,
};
