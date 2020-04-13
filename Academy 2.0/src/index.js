/* eslint-disable no-unused-vars */
// Подключение нормализации css файлов
import './vendor/normalize.css'
// Подключение основного файла css
import './index.css'
// Подключение блока-переключателя и основного меню
import { menuHandler, mainMenu } from './blocks/menu/menu'
// Подключение переключателя, который зависит от разрешения экрана
import modalsHandler from './blocks/main/modalsHandler'
// Подключение новостных постов 
import Card from './blocks/main/card/card'
// Подключение форм, всплывающих при входе на сайт
import { loginForm, signupForm, regComplete } from './blocks/main/auth-form/auth-form'

// Создание нового новостного поста
const cardIconSave = new Card(document.querySelector('.results'))


regComplete.open()

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
};
