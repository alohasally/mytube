import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const privateOptions = [
  { value: 0, label: "public" },
  { value: 1, label: "private" },
];

const categoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
  { value: 4, label: "Sports" },
  { value: 5, label: "Travel & Events" },
];

function VideoUploadPage() {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState("film & Animation");

  const onTitleChange = (e) => {
    setVideoTitle(e.target.value);
  };

  const onDescriptChange = (e) => {
    setVideoDescription(e.target.value);
  };

  const onPrivateChange = (e) => {
    setPrivate(e.target.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    Axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        alert("Failed to upload video");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>upload</Title>
      </div>
      <Form onSubmit>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dropzone onDrop={onDrop} multipl={false} maxSize={100000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>
          {/* Thumbnail */}
        </div>
        <div>
          <img src="" alt="" />
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={videoTitle} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptChange} value={videoDescription} />
        <br />
        <br />

        <select onChange={onPrivateChange} value={Private}>
          {privateOptions.map((opt, index) => {
            return (
              <option key={index} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange} value={Category}>
          {categoryOptions.map((category, index) => {
            return (
              <option key={index} value={category.value}>
                {category.label}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <Button type="primary" size="large">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
