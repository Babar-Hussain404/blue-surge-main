import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSingleAddressReq, putContactAddressReq } from '../__requests/RequestUser';

const EditContactAddress = ({ setAddState, setContactLoading }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const addresEditReducer = useSelector((state) => state.addressStateReducer);


    const [errorMsg, setErrorMsg] = useState(false);

    const [addressData, setAddressData] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
    })
    const handleChange = (e) => {
        setAddressData({
            ...addressData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await putContactAddressReq(addresEditReducer,addressData);
            setAddState(0)
            setContactLoading(true)
            console.log("Form submitted successfully!");
            console.log("Response:", response);
        } catch (error) {
            console.log("error", error);
            setContactLoading(true)
            if (error.response && error.response.status === 400) {
                // setErrIdMsg(error.response.data.error);
                return false;
            }
        }
    };


    const getSingleAddress = async (page) => {
        // setProductLoading(true)
        try {
          const response = await getSingleAddressReq(addresEditReducer);
          setAddressData(response.data.address);
          
        } catch (error) {
          console.log("Error fetching products:", error);
          // setProductLoading(false)
          // dispatch(pageNumberRefresh(false));
        }
      };
      useEffect(() => {
        if (addresEditReducer) {
            getSingleAddress();
        }
      }, [addresEditReducer])

    return (
        <>
            <form onSubmit={handleSubmit}  >

                <diV className="form-group ">

                    <div className="col-xs-4">
                        <label className="form-label ">Name </label>
                        <div
                            className={`input-group ${errorMsg && !addressData.name && "has-error"
                                } `}
                        >
                            <span className="input-group-addon">
                                <i className="gi gi-user" />
                            </span>
                            <input
                                type="text"
                                required
                                onChange={handleChange}
                                id="register-firstname"
                                name="name"
                                value={addressData.name}
                                className={`form-control input-lg `}
                                placeholder="Title"
                            />
                        </div>
                        {errorMsg && !addressData.name && (
                            <span className="text-danger">
                                Please Enter Name before Adding
                            </span>
                        )}
                    </div>

                    <div className="col-xs-4">
                        <label className="form-label ">Street </label>
                        <input
                            onChange={handleChange}
                            className={` form-control input-lg  "has-error"
                                } `}
                            type="text"
                            required
                            name="street"
                            placeholder="Street"
                            value={addressData.street}
                        />

                    </div>

                    <div className="col-xs-4">
                        <label className="form-label ">City </label>
                        <input
                            onChange={handleChange}
                            className={` form-control input-lg ${errorMsg && !addressData.city && "has-error"
                                } `}
                            type="text"
                            required
                            name="city"
                            value={addressData.city}
                            placeholder="city"
                        />
                        {errorMsg && !addressData.address_street && (
                            <span className="text-danger">
                                Please Enter Street Before SignUp
                            </span>
                        )}
                    </div>



                </diV>
                <br />
                <br />
                <br />
                <diV className="form-group">

                    <div className="col-xs-4">
                        <label className="form-label ">State </label>
                        <div
                        >
                            <input
                                onChange={handleChange}
                                className={` form-control input-lg  "has-error"} `}
                                type="text"
                                required
                                name="state"
                                placeholder="state"
                                value={addressData.state}
                            />
                        </div>
                        {errorMsg && !addressData.state && (
                            <span className="text-danger">
                                Please Enter Name before Adding
                            </span>
                        )}
                    </div>

                    <div className="col-xs-4">
                        <label className="form-label ">Country </label>
                        <input
                            onChange={handleChange}
                            className={` form-control input-lg  "has-error"} `}
                            type="text"
                            required
                            name="country"
                            placeholder="country"
                            value={addressData.country}
                        />

                    </div>

                    <div className="col-xs-4">
                        <label className="form-label ">Zip Code </label>
                        <input
                            onChange={handleChange}
                            className={` form-control input-lg ${errorMsg && !addressData.zipcode && "has-error"
                                } `}
                            type="text"
                            required
                            name="zipcode"
                            placeholder="zipcode"
                            value={addressData.zipcode}
                        />
                        {errorMsg && !addressData.zipcode && (
                            <span className="text-danger">
                                Please Enter zipcode
                            </span>
                        )}
                    </div>



                </diV>



                <div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="btn btn-primary"
                        style={{ marginTop: '10rem', marginLeft: '2rem' }}
                    >
                        {" "}
                        Update Address
                    </button>
                </div>

            </form>
        </>
    )
}

export default EditContactAddress
