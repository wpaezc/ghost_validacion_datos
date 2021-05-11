//Importar Playwright
const { LoginPage } = require('./models/LoginPage');
const { Navigate } = require('./models/Navigate');
const { Editor } = require('./models/Editor');
const playwright = require('playwright');
const config = require('../playwright_properties.json');

const ghostUrl = config.ghostUrl
const user = config.user
const password = config.password

const titleTest = "postManagementPublishPost"
const pathScreenshotsTest =`./screensTest/${titleTest}/`

const url = `${ghostUrl}/ghost/#/signin`;
console.log('Run tests for POST MANAGEMENT');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: Publish post')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page, url, user, password);
    const navigator = new Navigate(page);
    const editor = new Editor(page);
    await loginPage.enter_ghost()
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await navigator.clickOnSidebar('posts')
    await page.screenshot({path: pathScreenshotsTest+ './visit_posts.png'})
    // Crear nueva post
    await navigator.clickOnNewEditor('post')
    await page.screenshot({path: pathScreenshotsTest+ './new_post.png'})
    // editar titulo del post
    await editor.fillTitle("Publish on editor")
    await page.screenshot({path: pathScreenshotsTest+ './editing.png'})
 
    await editor.triggerSave()
    await editor.openPublishPopup()
    await page.screenshot({path: pathScreenshotsTest+ './open_publish_popup.png'})
    await editor.publish()
    await page.screenshot({path: pathScreenshotsTest+ './finish_publishing.png'})

    // // salir de la post
    await navigator.saveAndFinishEditing('posts')
    await page.screenshot({path: pathScreenshotsTest+ './returning_and_saving.png'})

    await page.click('section .ember-view');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ './end.png'})

    //Finalizar la prueba
    console.log('Ok Scenario: Publish post')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
