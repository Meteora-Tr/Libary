const {
    Router
} = require('express')
const router = Router()
const Category = require('../models/Category')
const fileMiddleware = require('../middleware/fileMiddleware')
const toDelete = require('../middleware/toDelete')
const Product = require('../models/Product')
/* const adminController = require('../controller/adminController') */


/* router.get('/products/', adminController.getProducts) */

router.get('/products', async (req, res) => {
    const products = await Product.find()
    res.render('admin/products', {
        layout: 'admin',
        title: 'Book Page',
        products
    })
})

router.get('/products/add', async (req, res) => {
    const categories = await Category.find()
    res.render('admin/addProduct', {
        layout: 'admin',
        title: 'Create books page',
        categories
    })
})

router.post('/products/add', fileMiddleware.single('img'), async (req, res) => {
    const img = req.file.filename
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        img,
        categoryId: req.body.categoryId
    })
    await product.save()
    res.redirect('/admin/products')
})
/* router.get('/products/edit/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.render('admin/editProducts', {
        name: 'Edit Product',
        product,
        layout: 'admin'

    })

})

 router.post('/products/edit/:id', fileMiddleware.single('img'),
    async (req, res) => {
        const {
            img
        } = await Product.findById(req.params.id)
        const admin = req.body
        if (req.file) {
            admin.img = req.file.filename
            toDelete(img)

        } else {
            admin.img = img
        }
        console.log(admin);
        await Product.findByIdAndUpdate(req.params.id, admin, (err) => {
            if (err) {
                console.log(err);

            } else {
                res.redirect('/admin/products')
            }
        })
    }) */

    router.get('/products/edit/:id',async(req,res)=>{
        const products = await Product.findById(req.params.id)
        res.render('admin/editProducts',{
            title: 'Edit Product',
            products,
            layout: 'admin'
        })

    })
    router.post('/products/edit/:id', fileMiddleware.single('img'), 
        async(req,res)=>{
        const admin = req.body
        admin.img = req.file.filename
        await Product.findByIdAndUpdate(req.params.id,admin,(err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/admin/products')
            }
        })
    })


router.get('/products/delete/:id', async (req, res) => {
    const {
        img
    } = await Product.findById(req.params.id)
    toDelete(img)
    await Product.findByIdAndDelete(req.params.id)
    res.redirect('/admin/products')

})







module.exports = router