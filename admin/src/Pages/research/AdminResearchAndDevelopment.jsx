import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getResearchToConnectReq, postResearchReq } from "./__requests/RequestResearch";

const AdminResearchAndDevelopment = () => {
  const initialValue = {
    heading: "",
    headingParagraph: "",
    ourTeam: "",
    ourTeamDetail: "",
    ourTeamImage: null,
    research: "",
    researchImage: null,
    test: "",
    technology: "",
    technologyImage: "",
    products: [],
    categories: [], // Categories with parent and subcategories
  };

  const [rdData, setRdData] = useState(initialValue);
  const [ourTeamImagePreview, setOurTeamImagePreview] = useState(null);
  const [researchImagePreview, setResearchImagePreview] = useState(null);
  const [technologyImagePreview, setTechnologyImagePreview] = useState(null);
  const [newCategory, setNewCategory] = useState({
    parentCategoryName: "",
    subcategories: [], // Array of subcategories
  });
  const [newSubcategory, setNewSubcategory] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [errIdMsg, setErrIdMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getResearchToConnectReq();
        setRdData(response.data.rd);

        if (response.data.rd.ourTeamImage) {
          const ourTeamImageUrl = `https://admin.bluesurge.com.pk/uploads/${response.data.rd.ourTeamImage}`;
          setOurTeamImagePreview(ourTeamImageUrl);
        }
        if (response.data.rd.researchImage) {
          const researchImageUrl = `https://admin.bluesurge.com.pk/uploads/${response.data.rd.researchImage}`;
          setResearchImagePreview(researchImageUrl);
        }
        if (response.data.rd.technologyImage) {
          const technologyImageUrl = `https://admin.bluesurge.com.pk/uploads/${response.data.rd.technologyImage}`;
          setTechnologyImagePreview(technologyImageUrl);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [getResearchToConnectReq]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setRdData({
        ...rdData,
        [e.target.name]: e.target.files[0],
      });

      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          if (e.target.name === "ourTeamImage") {
            setOurTeamImagePreview(reader.result);
          } else if (e.target.name === "researchImage") {
            setResearchImagePreview(reader.result);
          } else if (e.target.name === "technologyImage") {
            setTechnologyImagePreview(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setRdData({
        ...rdData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Category and subcategory handling functions
  const handleCategoryChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubcategoryChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewSubcategory({
          ...newSubcategory,
          image: reader.result, // Set image as Base64 string
        });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setNewSubcategory({
        ...newSubcategory,
        [e.target.name]: e.target.value,
      });
    }
  };

  const addSubcategory = () => {
    setNewCategory({
      ...newCategory,
      subcategories: [...newCategory.subcategories, newSubcategory],
    });
    setNewSubcategory({ title: "", description: "", image: null });
  };

  const addCategory = () => {
    setRdData({
      ...rdData,
      categories: [...rdData.categories, newCategory],
    });
    setNewCategory({ parentCategoryName: "", subcategories: [] });
  };

  const updateCategory = (index, updatedCategory) => {
    const updatedCategories = [...rdData.categories];
    updatedCategories[index] = updatedCategory;
    setRdData({ ...rdData, categories: updatedCategories });
  };

  const deleteCategory = (index) => {
    const updatedCategories = rdData.categories.filter((_, i) => i !== index);
    setRdData({ ...rdData, categories: updatedCategories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("heading", rdData.heading);
    formData.append("headingParagraph", rdData.headingParagraph);
    formData.append("ourTeam", rdData.ourTeam);
    formData.append("ourTeamDetail", rdData.ourTeamDetail);
    formData.append("ourTeamImage", rdData.ourTeamImage);
    formData.append("research", rdData.research);
    formData.append("researchImage", rdData.researchImage);
    formData.append("technology", rdData.technology);
    formData.append("test", rdData.test);
    formData.append("technologyImage", rdData.technologyImage);
    formData.append("products", rdData.products);
    debugger
    // Serialize categories as a JSON string
    formData.append("categories", JSON.stringify(rdData.categories));
    // rdData.categories.forEach((category, index) => {
    //   formData.append(`categories[${index}][parentCategoryName]`, category.parentCategoryName);
    //   category.subcategories.forEach((sub, subIndex) => {
    //     formData.append(`categories[${index}][subcategories][${subIndex}][title]`, sub.title);
    //     formData.append(`categories[${index}][subcategories][${subIndex}][description]`, sub.description);
    //     formData.append(`categories[${index}][subcategories][${subIndex}][image]`, sub.image);
    //   });
    // });

    try {
      const response = await postResearchReq(formData);
      toast.success("Research and Development Updated Successfully");
      setErrIdMsg("");
    } catch (error) {
      console.log("error", error);
      if (error.response && error.response.status === 400) {
        setErrIdMsg(error.response.data.error);
      }
    }
  };

  return (
    <>
      <div 
      // style={{ height: "100vh" }}
      id="page-content">
        {errIdMsg && (
          <div className="error_messages login-title themed-background-fire text-center">
            <p className="text-light">{errIdMsg}</p>
          </div>
        )}
        <form className="form-horizontal" onSubmit={handleSubmit} style={{marginTop: '40px'}}>
          <div className="col-md-7">
            <div>
              <label>Heading Title</label>
              <CKEditor
                editor={ClassicEditor}
                data={rdData.heading || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setRdData({ ...rdData, heading: data });
                }}
              />
            </div>
            <div>
              <label>Research And Development</label>
              <CKEditor
                editor={ClassicEditor}
                data={rdData.technology || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setRdData({ ...rdData, technology: data });
                }}
              />
            </div>
            <div>
              <label>Heading Paragraph</label>
              <CKEditor
                editor={ClassicEditor}
                data={rdData.headingParagraph || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setRdData({ ...rdData, headingParagraph: data });
                }}
              />
            </div>
            <div>
              <label>Innovation Title</label>
              <CKEditor
                editor={ClassicEditor}
                data={rdData.ourTeam || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setRdData({ ...rdData, ourTeam: data });
                }}
              />
            </div>
            <div>
              <label>Innovation Detail</label>
              <CKEditor
                editor={ClassicEditor}
                data={rdData.ourTeamDetail || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setRdData({ ...rdData, ourTeamDetail: data });
                }}
              />
            </div>
          </div>
            <div className="col-md-5">
              <h4>Categories</h4>
              {rdData.categories.map((category, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name="parentCategoryName"
                    value={category.parentCategoryName}
                    onChange={(e) =>
                      updateCategory(index, { ...category, parentCategoryName: e.target.value })
                    }
                    placeholder="Parent Category Name"
                  />
                  <h5>Subcategories</h5>
                  {category.subcategories.map((sub, subIndex) => (
                    <div key={subIndex}>
                      <input
                        type="text"
                        name="title"
                        value={sub.title}
                        onChange={(e) =>
                          updateCategory(index, {
                            ...category,
                            subcategories: category.subcategories.map((s, i) =>
                              i === subIndex ? { ...s, title: e.target.value } : s
                            ),
                          })
                        }
                        placeholder="Subcategory Title"
                      />
                      <textarea
                        name="description"
                        value={sub.description}
                        onChange={(e) =>
                          updateCategory(index, {
                            ...category,
                            subcategories: category.subcategories.map((s, i) =>
                              i === subIndex ? { ...s, description: e.target.value } : s
                            ),
                          })
                        }
                        placeholder="Subcategory Description"
                      />
                      {sub.image && (
                        <img src={sub.image} alt="Subcategory Preview" style={{ width: "100px", height: "100px" }} />
                      )}
                    </div>
                  ))}
                </div>
              ))}
              <div>
                <h5>Add New Category</h5>
                <input
                  type="text"
                  name="parentCategoryName"
                  value={newCategory.parentCategoryName}
                  onChange={handleCategoryChange}
                  placeholder="Parent Category Name"
                />
                <h6>Add New Subcategory</h6>
                <input
                  type="text"
                  name="title"
                  value={newSubcategory.title}
                  onChange={handleSubcategoryChange}
                  placeholder="Subcategory Title"
                />
                <textarea
                  name="description"
                  value={newSubcategory.description}
                  onChange={handleSubcategoryChange}
                  placeholder="Subcategory Description"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleSubcategoryChange}
                  accept="image/*"
                />
                <button type="button" onClick={addSubcategory}>
                  Add Subcategory
                </button>
                <button type="button" onClick={addCategory}>
                  Add Category
                </button>
              </div>
            </div>
          <button type="submit" className="btn btn-primary">
            Update R&D
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminResearchAndDevelopment;
