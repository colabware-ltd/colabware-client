import { useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import logo from "../../assets/colabware.svg";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import NewProjectForm from "../../components/forms/NewProjectForm";
import axios from "axios";
import DoughnutChart from "../../components/DoughnutChart";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  let navigate = useNavigate();
  let [form, updateForm] = useState({
    currentPage: 0,
    progress: "0%",
  });
  let [project, updateProject] = useState({
    name: "",
    repository: "",
    description: "",
    categories: [""],
    maintainers: ["test_user"],
    tokenName: "",
    tokenSymbol: "",
    tokenPrice: null, // Integer
    tokenSupply: null, // Integer
    maintainerAllocation: null, // Float
  });
  let [fieldInvalid, updateFieldInvalid] = useState({
    projectName: false,
    projectRepository: false,
    tokenName: false,
    tokenSymbol: false,
    tokenPrice: false,
    tokenSupply: false,
    maintainerAllocation: false,
  });
  let progressData = {
    datasets: [
      {
        data: [form.currentPage, 3 - form.currentPage],
        backgroundColor: ["rgba(42, 102, 255, 0.7)", "rgba(42, 102, 255, 0.1)"],
        borderColor: ["rgba(42, 102, 255, 0.7)", "rgba(54, 162, 235, 0.1)"],
        borderWidth: 1,
      },
    ],
  };

  let nextStep = () => {
    switch (form.currentPage) {
      case 0:
        var projectNameInvalid = project.name == "" ? true : false;
        var projectRepositoryInvalid = project.repository == "" ? true : false;

        updateFieldInvalid({
          projectName: projectNameInvalid,
          projectRepository: projectRepositoryInvalid,
        });

        if (!projectNameInvalid && !projectRepositoryInvalid) {
          updateForm({
            currentPage: form.currentPage + 1,
            progress:
              Math.floor(((form.currentPage + 1) / 3) * 100).toString() + "%",
          });
        }
        break;

      case 1:
        var tokenNameInvalid = project.tokenName == "" ? true : false;
        var tokenSymbolInvalid = project.tokenSymbol == "" ? true : false;
        var tokenPriceInvalid = project.tokenPrice == null ? true : false;
        var tokenSupplyInvalid = project.tokenSupply == null ? true : false;
        var maintainerAllocationInvalid =
          project.maintainerAllocation == null ? true : false;

        updateFieldInvalid({
          tokenName: tokenNameInvalid,
          tokenSymbol: tokenSymbolInvalid,
          tokenPrice: tokenPriceInvalid,
          tokenSupply: tokenSupplyInvalid,
          maintainerAllocation: maintainerAllocationInvalid,
        });

        if (
          !tokenNameInvalid &&
          !tokenSymbolInvalid &&
          !tokenPriceInvalid &&
          !tokenSupplyInvalid &&
          !maintainerAllocationInvalid
        ) {
          updateForm({
            currentPage: form.currentPage + 1,
            progress:
              Math.floor(((form.currentPage + 1) / 3) * 100).toString() + "%",
          });
        }
        break;
    }
  };

  let prevStep = () => {
    if (form.currentPage > 0) {
      updateForm({
        currentPage: form.currentPage - 1,
        progress:
          Math.floor(((form.currentPage - 1) / 3) * 100).toString() + "%",
      });
    }
  };

  let launchProject = () => {
    let url = "http://localhost/api/project";
    let data = {
      name: project.name,
      repository: project.repository,
      description: project.description,
      categories: project.projectCategory,
      maintainers: ["declan", "nathan"],
      tokenConfig: {
        name: project.tokenName,
        symbol: project.tokenSymbol,
        price: parseInt(project.tokenPrice),
        maintainerAllocation: parseFloat(project.maintainerAllocation),
      },
    };
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios.post(url, data, headers).then(
      (res) => {
        console.log(res);
        navigate(`/project/${encodeURI(res.data.name)}`);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <Row>
      <Col
        xs={2}
        className="full-vh d-none d-lg-block"
        id="form-progress-container"
      >
        <Row className="full-length">
          <Col className="my-auto">
            <a href="/">
              <img alt="colabware-logo-main" src={logo} className="logo-sm" />
            </a>
            <DoughnutChart
              label={form.progress}
              tooltip={false}
              cutout={"90%"}
              data={progressData}
            />
          </Col>
        </Row>
      </Col>
      <Col>
        <Container className="full-length">
          <Row className="full-length form-padding">
            <Col className="my-auto">
              <SwitchTransition mode="out-in">
                <CSSTransition
                  key={form.currentPage}
                  addEndListener={(node, done) => {
                    node.addEventListener("transitionend", done, false);
                  }}
                  classNames="fade"
                >
                  <NewProjectForm
                    currentPage={form.currentPage}
                    project={project}
                    updateProject={updateProject}
                    fieldInvalid={fieldInvalid}
                  />
                </CSSTransition>
              </SwitchTransition>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  marginBottom: "30px",
                }}
              >
                <Button
                  onClick={prevStep}
                  variant="secondary"
                  disabled={form.currentPage == 0}
                  style={{ marginRight: "10px" }}
                >
                  Previous
                </Button>

                {form.currentPage != 2 && (
                  <Button style={{ float: "right" }} onClick={nextStep}>
                    Next
                  </Button>
                )}
                {form.currentPage == 2 && (
                  <Button style={{ float: "right" }} onClick={launchProject}>
                    Launch project
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default NewProject;
