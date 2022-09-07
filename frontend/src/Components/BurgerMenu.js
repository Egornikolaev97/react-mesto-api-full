const BurgerMenu = ({ userEmail, handleLogOut, isBurgerMenuOpen }) => {
    return (
      <div className={`burger-menu ${isBurgerMenuOpen && "burger-menu_opened"} `}>
        <p className="burger-menu__email">{userEmail}</p>
        <button className="burger-menu__exit" type="button" onClick={handleLogOut}>Выйти</button>
    </div>
    )
  }

export default BurgerMenu;