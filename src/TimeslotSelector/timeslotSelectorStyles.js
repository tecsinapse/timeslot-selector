import { globalConst } from '@tecsinapse/ui-kit/build/globalStyle';

export const timeslotSelectorStyles = ({ palette, spacing }) => ({
  root: {
    minWidth: globalConst.minWidth,
    width: '100%',
    height: 'calc(100% - 8px)',
    minHeight: '450px',
    position: 'relative',
  },
  paperScrollPaper: {
    height: '100%',
  },
  stepHeader: {
    padding: '12px',
  },
  stepContent: {
    left: '0px',
    right: '0px',
    position: 'absolute',
    bottom: '73px',
    top: '180px',
  },
  stepContentScrolling: {
    display: 'flex',
    overflowY: 'scroll',
    height: '100%',
    padding: '8px',
  },
  stepButtons: {
    padding: `${spacing(1)}px`,
    spacing: `${spacing(2)}px`,
    right: '0px',
    left: '0px',
    position: 'absolute',
    bottom: '0px',
  },
  availabilityCardRoot: {
    padding: `${spacing(1)}px !important`,
    paddingBottom: `${spacing(1)}px !important`,
  },
  vehicleCards: {
    width: '50%',
    marginRight: `${spacing(1)}px !important`,
  },
  vehicleCardRoot: {
    marginBottom: `${spacing(1)}px !important`,
    cursor: 'pointer',
  },
  vehicleCardRootSelected: {
    backgroundColor: 'rgba(249, 159, 31, 0.1)',
    border: '1px solid rgb(249, 159, 31)',
    boxSizing: 'border-box',
  },
  availabilityCardTime: {
    margin: `${spacing(1 / 4)}px`,
  },
  timeSelectedBullet: {
    color: 'gray',
  },
});
