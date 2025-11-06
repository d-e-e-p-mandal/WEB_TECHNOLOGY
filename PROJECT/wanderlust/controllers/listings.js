const Listing = require("../models/listing");
const { cloudinary } = require('../cloudConfig');

module.exports.index=async (req,res)=>
{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req,res)=>
{ 
   res.render("listings/new.ejs");
};

module.exports.showListing =async (req,res)=>
{
   let {id}= req.params;
   const listing= await Listing.findById(id)
   .populate({path : "reviews",
    populate:{
      path:"author",
   },
})
.populate("owner");
   if(!listing)
   {
      req.flash("error","Listing you requested for does not exist!");
      res.redirect("/listings");
   }
   console.log(listing);
   res.render("listings/show.ejs",{listing});

};
module.exports.createListing = async (req, res, next) => {
   const newListing = new Listing(req.body.listing);
   newListing.owner = req.user._id;
   if (req.file) {
     newListing.image = {
       url: req.file.path,      // multer-storage-cloudinary uses `path` for secure_url
       filename: req.file.filename,  // the public_id in Cloudinary
     };
   }
   await newListing.save();
   req.flash("success", "New Listing Created!");
   res.redirect("/listings");
 };


   module.exports.renderEditForm =async (req,res)=>
   {
      let {id}= req.params;
      const listing= await Listing.findById(id);
      if(!listing)
      {
         req.flash("error","Listing you requested for does not exist!");
         res.redirect("/listings");
      }

     let originalImageUrl = listing.image.url;
     originalImageUrl= originalImageUrl.replace("/upload","/upload/h_200,w_200");

      res.render("listings/edit.ejs",{listing,originalImageUrl});
   };



   
   module.exports.updateListing = async (req, res) => {
     const { id } = req.params;
   
     // Find listing first (to get old image info)
     const listing = await Listing.findById(id);
     if (!listing) {
       req.flash("error", "Listing not found!");
       return res.redirect("/listings");
     }
   
     // Update listing fields
     Object.assign(listing, req.body.listing);
   
     if (req.file) {
       // Delete old image from Cloudinary if exists
       if (listing.image && listing.image.filename) {
         await cloudinary.uploader.destroy(listing.image.filename);
       }
   
       // Add new image info
       listing.image = {
         url: req.file.path,
         filename: req.file.filename,
       };
     }
   
     await listing.save();
     req.flash("success", "Listing Updated!");
     res.redirect(`/listings/${id}`);
   };
   
   module.exports.destroyListing = async (req, res) => {
     const { id } = req.params;
     
     // Find listing to get image info
     const listing = await Listing.findById(id);
     if (!listing) {
       req.flash("error", "Listing not found!");
       return res.redirect("/listings");
     }
   
     // Delete image from Cloudinary if exists
     if (listing.image && listing.image.filename) {
       await cloudinary.uploader.destroy(listing.image.filename);
     }
   
     // Delete listing from DB
     await Listing.findByIdAndDelete(id);
     
     req.flash("success", "Listing Deleted!");
     res.redirect("/listings");
   };