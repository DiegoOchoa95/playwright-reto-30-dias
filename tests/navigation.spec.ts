import {expect, test} from '@playwright/test'

test('check left menu options', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox',{name:/username|Nombre de usuario/}).fill('Admin') //se modifico para que permita ubicar los elementos en español e ingles
    await page.getByRole('textbox',{name:/password|Contraseña/}).fill('admin123')
    await page.getByRole('button',{name:/Login|Ingresar/}).click()

    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()//valida que ingresaste a la pagina

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')//capturo todos los valores del menu
    const currentMenuItemsCount = await leftMenuItems.count()//variable almacena la cantidad de items
    console.log('cantidad de items en el menu: ', currentMenuItemsCount)

    const currentMenuItems: String[]=[]

    for(let i=0; i<currentMenuItemsCount; i++){

        const menuText = await leftMenuItems.nth(i).innerText()
        currentMenuItems.push(menuText)//agrega los valores al arreglo
    }

    console.log(currentMenuItems) //comparar el resultado real obtenido de la página contra el resultado esperado

    const expectMenuItems = [
        'Admin',       
        'PIM',
        'Leave',       
        'Time',
        'Recruitment', 
        'My Info',
        'Performance', 
        'Dashboard',
        'Directory',   
        'Maintenance',
        'Claim',       
        'Buzz'
        ];

    expect(currentMenuItems).toEqual(expectMenuItems)

    //Tarea validar que el primer elemento es admin 
    expect(currentMenuItems[0]).toBe('Admin')//si colocas otro valor cae esta validacion

    if (currentMenuItems[0] === 'Admin') {
        console.log('✅ Validación correcta: el primer menú es Admin');
    } else {
        console.log('❌ Validación incorrecta: el primer menú NO es Admin');
    }
})