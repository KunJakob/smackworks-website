import { Button, Icon, Input, Switch, Form as AntForm } from "antd";
import { Form, withFormik } from "formik";
import React, { Component } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

const FormItemWithSpacing = styled(AntForm.Item)`
  margin-bottom: 24px;
`;

class RawCreateQuestForm extends Component {
  state = {};
  render() {
    return (
      <Form
        style={{
          display: "flex"
        }}
      >
        <div
          style={{
            maxWidth: "750px",
            width: "100%",
            margin: "auto"
          }}
        >
          <FormItemWithSpacing>
            <div>Quest Name</div>
            <Input
              name="name"
              placeholder="My Quest Name"
              autoComplete="off"
              value={this.props.values.name}
              onChange={this.props.handleChange}
            />
          </FormItemWithSpacing>
          <FormItemWithSpacing>
            <div>Ignore Quest Slots </div>
            <Switch
              name="ignoresQuestSlots"
              checked={this.props.values.ignoresQuestSlots}
              onChange={value => {
                this.props.setFieldValue("ignoresQuestSlots", value);
              }}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
            />
          </FormItemWithSpacing>
          <AntForm.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              Create
            </Button>
          </AntForm.Item>
        </div>
      </Form>
    );
  }
}

const FormikCreateQuestForm = withFormik({
  mapPropsToValues({ name, ignoresQuestSlots }) {
    return {
      name: name || "",
      ignoresQuestSlots: ignoresQuestSlots || false
    };
  },
  handleSubmit(values, bag) {
    const { setErrors } = bag;
    /**@todo change this error condition to reflect a gql error */
    if (false === 0) {
      setErrors(["Mission Failed. We'll get them next time boys"]);
    }
    bag.props.sendMutation(values);
    console.log(values);
  }
})(RawCreateQuestForm);

export const CreateQuestForm = withRouter(FormikCreateQuestForm);
