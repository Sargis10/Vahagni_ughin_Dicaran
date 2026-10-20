import hy from '../i18n/hy.js';

export const paths = {
  home: '/',
  archive: '/archive',
  map: '/map',
  game: '/play',
  sources: '/sources',
};

export const navItems = [
  { to: paths.home, label: hy.nav.home, end: true },
  { to: paths.archive, label: hy.nav.archive },
  { to: paths.map, label: hy.nav.map },
  { to: paths.game, label: hy.nav.game },
  { to: paths.sources, label: hy.nav.sources },
];
