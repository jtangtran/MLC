const db = require('../db/models/index');
const Blog = db.Blog; 

// GET /blog/:id
const getBlog = (req, res) => {
    Blog.findByPk(req.params.id).then(blog => {
        if (blog == null) {
            res.status(404).json({
                errors: {
                    blog: 'not found'
                }
            });
        } else {
            res.send(blog);
        }
    })
   .catch(err => {
        return res.status(500).json({
            errors: {
                err
            },
        });
   });
};

// POST /blog
const postBlog = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(401).send("Unauthorized");
    }
    try {
        Blog.create({
            title: req.body.title,
            markdown: req.body.markdown,
            active: true
        });
        res.status(200).end();
    } catch(e){
        return res.status(400).json({
            errors: {
                e
            },
        });
    }
};

// PUT /blog/:id
const editBlog = (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(401).send("Unauthorized");
    }
    try {
        Blog.update({
            title: req.body.title,
            markdown: req.body.markdown,
            active: true
        }, { where: {id: req.params.id}});
        res.status(200).end();
    } catch(e){
        return res.status(400).json({
            errors: {
                e
            },
        });
    }
};

// DELETE /blog/:id
const deleteBlog = (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(401).send("Unauthorized");
    }
    try {
        Blog.update({
            active: false
        }, { where: {id: req.params.id}});
        res.status(200).end();
    } catch(e){
        return res.status(400).json({
            errors: {
                e
            },
        });
    }
};

module.exports = {
    getBlog,
    postBlog,
    editBlog,
    deleteBlog,
};

