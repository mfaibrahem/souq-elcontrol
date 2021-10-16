import addImg from "../../assets/imgs/post/add.png";

import React from "react";

const MyDropZoneButtons = ({ filesToUpload, clearFiles, inputId }) => {
	return (
		<div className="dropZoneBtns">
			{/* {filesToUpload.length === 0 && (
			)} */}
			<label htmlFor={inputId} className="addFileBtn">
				<img src={addImg} alt="add file" />
				<span>Photo/Video</span>
			</label>
			{filesToUpload.length > 0 && (
				<div className="clearAllBtn" onClick={clearFiles}>
					<span>
						<i className="icon-trash"></i>
						Clear All
					</span>
				</div>
			)}
		</div>
	);
};

export default MyDropZoneButtons;
