const Category = require('../models/Category')
const toDelete = require('../middleware/toDelete')
const mongoose = require('mongoose')
/* const Product = require('../models/Product') */


module.exports.getCategories = async (req,res) => {
    const categories = await Category.find()
    res.render('admin/categories',{
        title: 'Admin Categories',
        layout: 'admin',
        categories
    })


}
module.exports.createCategory = async (req,res)=>{
    const{
        name
    } = await req.body

    req.file ? icon = req.file.filename : icon = ''
    const category = new Category({
        name,
        icon
    })

    await category.save()
    res.redirect('/admin/categories')
}
/* module.exports.getProducts = async (req,res) => {
    const products = await Product.find()
    res.render('admin/products',{
        title: 'Admin Categories',
        layout: 'admin',
        products
    })


}
module.exports.createProduct = async (req,res)=>{
    const{
        name
    } = await req.body

    req.file ? img = req.file.filename : img = ''
    const product = new Product({
        name,
        img
    })

    await products.save()
    res.redirect('/admin/products')
} */