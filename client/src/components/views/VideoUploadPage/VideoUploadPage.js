import React from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";

function VideoUploadPage() {
  const { Title } = Typography;
  const { TextArea } = Input;
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>upload</Title>
      </div>
      <Form onSubmit>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dropzone onDrop multiple maxSize>
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
        <Input onChange="" value="" />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange="" value="" />
        <br />
        <br />

        <select onChange="" value="">
          <option key value="">
            Select Category
          </option>
        </select>
        <br />
        <br />
        <select onChange="" value="">
          <option key value="">
            Select Category
          </option>
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
