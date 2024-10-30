import PostImageModal from "../../Component/main-container/post-template/PostImageModal";
import SingleImageModal from "../../Component/main-container/post-template/SingleImageModal";
import Modal from "../auth/Modal";

const MasterLayout = () => {
  return (
    <>
      <Modal />
      <PostImageModal />
      <SingleImageModal />
      
    
    </>
  );
};

export { MasterLayout };
