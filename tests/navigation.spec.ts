import {expect, test} from '@playwright/test'

test('check left menu options', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox',{name:/Username|Nombre de usuario/}).fill('Admin') //se modifico para que permita ubicar los elementos en español e ingles
    await page.getByRole('textbox',{name:/Password|Contraseña/}).fill('admin123')
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


//Reto 4: dar click a todos los items del panel de menu izquierdo
test('Click menu items', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox',{name:/Username|Nombre de usuario/}).fill('Admin') //se modifico para que permita ubicar los elementos en español e ingles
    await page.getByRole('textbox',{name:/Password|Contraseña/}).fill('admin123')
    await page.getByRole('button',{name:/Login|Ingresar/}).click()

    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()//valida que ingresaste a la pagina

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')//capturo todos los valores del menu
    const currentMenuItemsCount = await leftMenuItems.count()//variable almacena la cantidad de items
    
    for(let i=0; i<currentMenuItemsCount; i++){ //for para capturar el nombre del item y dar click a cada item del menu excepto un menu que te vota a otro login
        const menuitem = leftMenuItems.nth(i)
        const menuText = await menuitem.innerText()

        console.log('Items del Menú:', menuText)
        if (menuText !== 'Maintenance'){//if para que le dee click solo si es diferente a ese menu
            await menuitem.click()
        }
        
    }

})

//Reto tarea 4: dar click a todos los items del panel de menu izquierdo incliyendo Maintenance y regresar a la pagina principal y continuar con los clicks
test('Click menu items-workhome', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox',{name:/Username|Nombre de usuario/}).fill('Admin') //se modifico para que permita ubicar los elementos en español e ingles
    await page.getByRole('textbox',{name:/Password|Contraseña/}).fill('admin123')
    await page.getByRole('button',{name:/Login|Ingresar/}).click()

    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()//valida que ingresaste a la pagina

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')//capturo todos los valores del menu
    const currentMenuItemsCount = await leftMenuItems.count()//variable almacena la cantidad de items
    
    for(let i=0; i<currentMenuItemsCount; i++){ //for para capturar el nombre del item y dar click a cada item del menu excepto un menu que te vota a otro login
        const menuitem = leftMenuItems.nth(i)
        const menuText = await menuitem.innerText()

        console.log('Items del Menú:', menuText)
        await menuitem.click()

        if (menuText === 'Maintenance'){
            // Esperar que aparezca la validación de contraseña
            await page.waitForLoadState('networkidle');

            // Regresar
            await page.goBack();

            // Esperar que vuelva el menú lateral
            await expect(page.getByLabel('Sidepanel')).toBeVisible();
            
        }
        
    }

})

