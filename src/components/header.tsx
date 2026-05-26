

interface HeaderProps {
  darkTheme: boolean;
  setDarkTheme: (dark: boolean) => void;
}

const Header: React.FC<HeaderProps> = () => {
  // Navigation elements like the hamburger menu and shopping cart are integrated inside the hero component.
  // We return null to avoid any layout or visual duplication.
  return null;
};

export default Header;
