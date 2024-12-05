import React, { useState } from "react";
import { Button, Modal, Upload } from "antd";
import Image from "next/image";

interface IProps {
  fileList: any[];
  handleChange: (e: any) => void;
}

export const Files: React.FC<IProps> = ({ fileList, handleChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: any) => {
    setPreviewImage(file.uri || file.preview || file.thumbUrl);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.uri!.substring(file.uri!.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <div className="flex gap-4 border-4 items-center px-4 py-2 my-2 rounded-md">
      <Button type="default">Upload Image</Button>
    </div>
  );
  return (
    <>
      <Upload
        listType="picture"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple={true}
        showUploadList={{
          showDownloadIcon: true,
          downloadIcon: "Download",
          showRemoveIcon: true,
        }}
      >
        {fileList?.length >= 8 ? null : uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <Image alt="example" width={200} height={200} src={previewImage} />
      </Modal>
    </>
  );
};
