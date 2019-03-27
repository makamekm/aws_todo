import { Col, Row } from "antd";
import * as React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router";
import { renderRoutes } from "react-router-config";

@withRouter
export class MainLayout extends React.Component<any> {
  public render() {
    return (
      <div className="layout">
        <Helmet>
          <title>TODO Application</title>
          <link rel="stylesheet" type="text/css" href="/public/index.css" />
        </Helmet>
        <div className="layout-content">
          <Row justify="center" type="flex">
            <Col span={16} xs={23} sm={22} md={20} lg={18} xl={16}>
              {renderRoutes(this.props.route.routes)}
            </Col>
          </Row>
        </div>
        <div style={{
          padding: 10,
          opacity: 0.5,
          textAlign: "center",
        }}>
          TODO@2019 Maxim Karpov
        </div>
      </div>
    );
  }
}
