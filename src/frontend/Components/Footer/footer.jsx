import React from "react"

import "./scss/footer.scss"

const Footer = () => {
  return (<footer>
    <div className="footerItem">
      Copyright © <a href="https://www.fordas.pl">Mateusz Fordas</a>  {new Date().getFullYear()}
    </div>
  </footer>
  )
}

export default Footer