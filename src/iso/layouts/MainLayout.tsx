import { Col, Row, Spin } from "antd";
import * as React from "react";
import { Helmet } from "react-helmet";
import { useInstance } from "react-ioc";
import { withRouter } from "react-router";
import { renderRoutes } from "react-router-config";
import { useObservable } from "rxjs-hooks";
import { pluck } from "rxjs/operators";
import { StoreService } from "../../iso/services/StoreService";

export const MainLayout = withRouter((props) => {
  const storeService = useInstance(StoreService);
  useObservable(() => storeService.store$.pipe(pluck("isLoading")));
  const isLoading = storeService.store$.value.isLoading;
  return (
    <div className="layout">
      <Helmet>
        <title>TODO Application</title>
        <link rel="stylesheet" type="text/css" href="/public/index.css" />
      </Helmet>
      <div className="layout-content">
        <Spin tip="Loading..." spinning={isLoading}>
          <Row justify="center" type="flex">
            <Col span={16} xs={23} sm={22} md={20} lg={18} xl={16}>
              {renderRoutes(props.route.routes)}
            </Col>
          </Row>
        </Spin>
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
});
