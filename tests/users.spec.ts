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

