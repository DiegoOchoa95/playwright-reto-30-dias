import { expect, test } from "@playwright/test"

//Extrae todos los nombres de todos los usuarios registrados
test('Get all the usernames registered', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox',{name:'Username'}).fill('Admin')
    await page.getByRole('textbox',{name:'Password'}).fill('admin123')
    await page.getByRole('button',{name:'Login'}).click()

    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()//valida que ingresaste a la pagina
    await page.getByRole('link',{name:'Admin'}).click()
    await page.locator('//*[@id="app"]/div[1]/div[1]/header/div[2]/nav/ul/li[1]/span').click()
    await page.getByRole('menuitem',{name:'Users'}).click()

    const rows = page.getByRole('table').getByRole('row') //codigo te da la tabla y cada una de sus filas
    const usernames: string[] = []    //Arreglo para capturar todos los Usernames
    
    const rowCount = await rows.count() //conteo de filas menos el header,porque alli estan los titulos de las columnas

    for(let i=1; i< rowCount; i++){
        const cell = rows.nth(i).getByRole('cell').nth(1)
        const username = await cell.textContent()

        if(username){
            usernames.push(username)
        }
    }
    console.log(usernames)

}) 

//Extrae todos los roles de los usuarios registrados
test('Get all the userroles', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox',{name:'Username'}).fill('Admin')
    await page.getByRole('textbox',{name:'Password'}).fill('admin123')
    await page.getByRole('button',{name:'Login'}).click()

    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()//valida que ingresaste a la pagina
    await page.getByRole('link',{name:'Admin'}).click()
    await page.locator('//*[@id="app"]/div[1]/div[1]/header/div[2]/nav/ul/li[1]/span').click()
    await page.getByRole('menuitem',{name:'Users'}).click()

    const rows = page.getByRole('table').getByRole('row') //codigo te da la tabla y cada una de sus filas
    const userroles: string[] = []    //Arreglo para capturar todos los Userroles
    
    const rowCount = await rows.count() //conteo de filas menos el header,porque alli estan los titulos de las columnas

    for(let i=1; i< rowCount; i++){
        const cell = rows.nth(i).getByRole('cell').nth(2)
        const userrol = await cell.textContent()

        if(userrol){
            userroles.push(userrol)
        }
    }
    console.log(userroles)

}) 

//Extrae todos los employees name de los usuarios registrados
test('Get all the Employees Names', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox',{name:'Username'}).fill('Admin')
    await page.getByRole('textbox',{name:'Password'}).fill('admin123')
    await page.getByRole('button',{name:'Login'}).click()

    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()//valida que ingresaste a la pagina
    await page.getByRole('link',{name:'Admin'}).click()
    await page.locator('//*[@id="app"]/div[1]/div[1]/header/div[2]/nav/ul/li[1]/span').click()
    await page.getByRole('menuitem',{name:'Users'}).click()

    const rows = page.getByRole('table').getByRole('row') //codigo te da la tabla y cada una de sus filas
    const employeenames: string[] = []    //Arreglo para capturar todos los employees Names
    
    const rowCount = await rows.count() //conteo de filas menos el header,porque alli estan los titulos de las columnas

    for(let i=1; i< rowCount; i++){
        const cell = rows.nth(i).getByRole('cell').nth(3)
        const employee = await cell.textContent()

        if(employee){
            employeenames.push(employee)
        }
    }
    console.log(employeenames)

}) 

//Extrae todos los datos en una sola ejecucion(usernames, userroles, employeenames)
test('todos los campos de los usuarios', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox',{name:'Username'}).fill('Admin')
    await page.getByRole('textbox',{name:'Password'}).fill('admin123')
    await page.getByRole('button',{name:'Login'}).click()

    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()//valida que ingresaste a la pagina
    await page.getByRole('link',{name:'Admin'}).click()
    await page.locator('//*[@id="app"]/div[1]/div[1]/header/div[2]/nav/ul/li[1]/span').click()
    await page.getByRole('menuitem',{name:'Users'}).click()

    const rows = page.getByRole('table').getByRole('row') //codigo te da la tabla y cada una de sus filas
    const rowCount = await rows.count() //conteo de filas menos el header,porque alli estan los titulos de las columnas
    
    const usernames: string[] = []    //Arreglo para capturar todos los Usernames
    for(let i=1; i< rowCount; i++){
        const cell = rows.nth(i).getByRole('cell').nth(1)
        const username = await cell.textContent()

        if(username){
            usernames.push(username)
        }
    }

    const userroles: string[] = []    //Arreglo para capturar todos los Userroles
    for(let i=1; i< rowCount; i++){
        const cell = rows.nth(i).getByRole('cell').nth(2)
        const userrol = await cell.textContent()

        if(userrol){
            userroles.push(userrol)
        }
    }
    
    const employeenames: string[] = []    //Arreglo para capturar todos los employees Names
    for(let i=1; i< rowCount; i++){
        const cell = rows.nth(i).getByRole('cell').nth(3)
        const employee = await cell.textContent()

        if(employee){
            employeenames.push(employee)
        }
    }
    console.log(usernames,userroles,employeenames)

}) 




