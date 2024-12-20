import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
    research: "[]", // Stringified JSON for categories
    researchImage: null,
    technology: "",
    technologyImage: "",
    products: [],
  };

  const [rdData, setRdData] = useState(initialValue);
  const [ourTeamImagePreview, setOurTeamImagePreview] = useState(null);
  const [researchImagePreview, setResearchImagePreview] = useState(null);
  const [technologyImagePreview, setTechnologyImagePreview] = useState(null);
  const [newCategory, setNewCategory] = useState({
    parentCategoryName: "",
    subcategories: [],
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
        const researchData = JSON.parse(response.data.rd.research || "[]");

        setRdData({
          ...response.data.rd,
          research: Array.isArray(researchData) ? researchData : [], // Ensure it's an array
        });

        if (response.data.rd.ourTeamImage) {
          setOurTeamImagePreview(`${process.env.REACT_APP_IMAGE_URL}/uploads/${response.data.rd.ourTeamImage}`);
        }
        if (response.data.rd.researchImage) {
          setResearchImagePreview(`${process.env.REACT_APP_IMAGE_URL}/uploads/${response.data.rd.researchImage}`);
        }
        if (response.data.rd.technologyImage) {
          setTechnologyImagePreview(`${process.env.REACT_APP_IMAGE_URL}/uploads/${response.data.rd.technologyImage}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
          image: reader.result,
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
    if (newCategory.subcategories.length < 3) {
      setNewCategory({
        ...newCategory,
        subcategories: [...newCategory.subcategories, newSubcategory],
      });
      setNewSubcategory({ title: "", description: "", image: null });
    } else {
      toast.warning("You can only add up to 3 subcategories per category.");
    }
  };

  const addCategory = () => {
    const updatedCategories = [...rdData.research, newCategory];
    setRdData({ ...rdData, research: updatedCategories });
    setNewCategory({ parentCategoryName: "", subcategories: [] });
  };

  const updateCategory = (index, updatedCategory) => {
    const updatedCategories = [...rdData.research];
    updatedCategories[index] = updatedCategory;
    setRdData({ ...rdData, research: updatedCategories });
  };

  const deleteCategory = (index) => {
    const updatedCategories = rdData.research.filter((_, i) => i !== index);
    setRdData({ ...rdData, research: updatedCategories });
  };

  const deleteSubcategory = (categoryIndex, subIndex) => {
    const updatedCategories = [...rdData.research];
    updatedCategories[categoryIndex].subcategories = updatedCategories[categoryIndex].subcategories.filter(
      (_, i) => i !== subIndex
    );
    setRdData({ ...rdData, research: updatedCategories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", rdData.heading);
    formData.append("headingParagraph", rdData.headingParagraph);
    formData.append("ourTeam", rdData.ourTeam);
    formData.append("ourTeamDetail", rdData.ourTeamDetail);
    formData.append("ourTeamImage", rdData.ourTeamImage);
    formData.append("research", JSON.stringify(rdData.research)); // Convert to JSON string
    formData.append("researchImage", rdData.researchImage);
    formData.append("technology", rdData.technology);
    formData.append("technologyImage", rdData.technologyImage);
    formData.append("products", rdData.products);

    try {
      await postResearchReq(formData);
      toast.success("Research and Development Updated Successfully");
      setErrIdMsg("");
    } catch (error) {
      console.error("Error updating data:", error);
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
        <form className="form-horizontal" onSubmit={handleSubmit} style={{ marginTop: '40px' }}>
          <div className="col-md-12">
            <div className="col-md-6">
              <label>Heading Title</label>
              <CKEditor
                editor={ClassicEditor}
                data={rdData.heading || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setRdData({ ...rdData, heading: data });
                }}
              />
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
            <div className="col-md-6">
              <label>Research And Development</label>
              <CKEditor
                editor={ClassicEditor}
                data={rdData.technology || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setRdData({ ...rdData, technology: data });
                }}
              />
              <label>Innovation Title</label>
              <CKEditor
                editor={ClassicEditor}
                data={rdData.ourTeam || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setRdData({ ...rdData, ourTeam: data });
                }}
              />
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
          <div className="col-md-12">
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
          <div className="col-md-12">
            <h4>Categories</h4>
            {Array.isArray(rdData.research) && rdData.research.map((category, index) => (
              <div key={index} className="col-md-6" style={{ border: '2px black solid', padding: '15px' }}>
                <h5>Parent category</h5>
                <input
                  type="text"
                  name="parentCategoryName"
                  value={category.parentCategoryName}
                  onChange={(e) =>
                    updateCategory(index, { ...category, parentCategoryName: e.target.value })
                  }
                  placeholder="Parent Category Name"
                />
                <button type="button" className={`btn btn-xs btn-danger`} style={{ margin: '0px 5px' }} onClick={() => deleteCategory(index)}>
                  <i className="fa fa-times" /> Category
                </button>
                <hr />
                <h5>Subcategories</h5>
                {category.subcategories.map((sub, subIndex) => (

                  <div key={subIndex}>
                    <table className="table table-bordered" style={{ borderCollapse: "collapse", width: "100%", border: "1px solid black", padding: '5px' }}>
                      <thead>
                        <tr>
                          <th style={{ border: "1px solid black" }}>Name</th>
                          <th style={{ border: "1px solid black" }}>Description</th>
                          <th style={{ border: "1px solid black" }}>Image</th>
                          <th style={{ border: "1px solid black" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ border: "1px solid black" }}>
                            <input
                              type="text"
                              name="title"
                              value={sub.title}
                              placeholder="Subcategory Title"
                              onChange={(e) =>
                                updateCategory(index, {
                                  ...category,
                                  subcategories: category.subcategories.map((s, i) =>
                                    i === subIndex ? { ...s, title: e.target.value } : s
                                  ),
                                })
                              }
                            />
                          </td>
                          <td style={{ border: "1px solid black" }}>
                            <textarea
                              name="description"
                              style={{ margin: "0px 5px" }}
                              value={sub.description}
                              placeholder="Subcategory Description"
                              onChange={(e) =>
                                updateCategory(index, {
                                  ...category,
                                  subcategories: category.subcategories.map((s, i) =>
                                    i === subIndex ? { ...s, description: e.target.value } : s
                                  ),
                                })
                              }
                            />
                          </td>
                          <td style={{ border: "1px solid black" }}>
                            {sub.image && (
                              <img
                                src={sub.image}
                                alt="Subcategory Preview"
                                style={{ width: "100px", height: "100px" }}
                              />
                            )}
                          </td>
                          <td style={{ border: "1px solid black" }}>
                            <button
                              type="button"
                              className={`btn btn-xs btn-danger`}
                              style={{ margin: "0px 5px" }}
                              onClick={() => deleteSubcategory(index, subIndex)}
                            >
                              <i className="fa fa-times" /> Subcategory
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ))}
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
