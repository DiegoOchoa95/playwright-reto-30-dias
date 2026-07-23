import {expect, test} from '@playwright/test'

//Login exitoso
test('login to HRM', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox',{name:'Username'}).fill('Admin')
    await page.getByRole('textbox',{name:'Password'}).fill('admin123')
    await page.getByRole('button',{name:'Login'}).click()

    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()//valida que ingresaste a la pagina
})

//Password incorrecto
test('password incorrecto', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox',{name:'Username'}).fill('Admin')
    await page.getByRole('textbox',{name:'Password'}).fill('probando123')
    await page.getByRole('button',{name:'Login'}).click()

    await expect(page.getByText('Invalid credentials')).toBeVisible()//valida que aparecio el mensaje de error
    await expect(page).toHaveURL(/auth\/login/)//confirma que el usuario no ingreso al sistema referente a la url

})

//Usuario incorrecto
test('usuario incorrecto', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox',{name:'Username'}).fill('Dieguito')
    await page.getByRole('textbox',{name:'Password'}).fill('admin123')
    await page.getByRole('button',{name:'Login'}).click()

    await expect(page.getByText('Invalid credentials')).toBeVisible()//valida que aparecio el mensaje de error
    await expect(page).toHaveURL(/auth\/login/)//confirma que el usuario no ingreso al sistema referente a la url

})

//Usuario y constraseña incorrectos
test('user and pass incorrecto', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox',{name:'Username'}).fill('Leonel Messi')
    await page.getByRole('textbox',{name:'Password'}).fill('elnumber1totheworld')
    await page.getByRole('button',{name:'Login'}).click()

    await expect(page.getByText('Invalid credentials')).toBeVisible()//valida que aparecio el mensaje de error
    await expect(page).toHaveURL(/auth\/login/)//confirma que el usuario no ingreso al sistema referente a la url

})



