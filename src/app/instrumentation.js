const mongoose = require('mongoose')

export async function register() {
    await dbConnect()
}