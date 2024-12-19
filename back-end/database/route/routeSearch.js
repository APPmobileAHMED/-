const router = require("express").Router();
const {searchByName,
    searchBycategoriesBySpecifqueType,
    searchBycategoriesBySpecifqueTypeAndName,
    serachByMeasureAndName,
    searchBycategoriesBySpecifqueTypeAndMeasures,
    searchBycategoriesBySpecifqueTypeAndMeasuresAndName,
    BarSearch
}=require("../controllers/searchProduct")

router.get("/searchByName/:name",searchByName)
router.get("/BarSearch/:name",BarSearch)
router.get("/searchBycategoriesBySpecifqueType/:specifiqueType",searchBycategoriesBySpecifqueType)
router.get("/searchBycategoriesBySpecifqueTypeAndName/:name/:specifiqueType",searchBycategoriesBySpecifqueTypeAndName)
router.get("/serachByMeasureAndName/:name/:width/:length",serachByMeasureAndName)
router.get("/searchBycategoriesBySpecifqueTypeAndMeasures/:specifiqueType/:width/:length",searchBycategoriesBySpecifqueTypeAndMeasures)
router.get("/searchBycategoriesBySpecifqueTypeAndMeasuresAndName/:name/:specifiqueType/:width/:length",searchBycategoriesBySpecifqueTypeAndMeasuresAndName)



module.exports=router