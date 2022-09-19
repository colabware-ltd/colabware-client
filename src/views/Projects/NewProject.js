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
    maintainerAllocation: 20,
    error: "",
  });
  let [project, updateProject] = useState({
    name: "",
    github: {
      repoOwner: "",
      repoName: "",
    },
    description: "",
    categories: [""],
    maintainers: [""],
    requests: [""],
    roadmap: [""],
    token: {
      name: "",
      symbol: "",
      price: 1.0,
      totalSupply: 1000,
      maintainerSupply: 200,
    },
  });
  let [fieldInvalid, updateFieldInvalid] = useState({
    projectName: false,
    repositoryOwner: false,
    repositoryName: false,
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

  const getProject = async () => {
    const url = `https://api.github.com/repos/${project.github.repoOwner}/${project.github.repoName}`;
    // const headers = {
    //   Accept: "application/vnd.github+json",
    // };
    try {
      const res = await axios.get(url, {
        validateStatus: function (status) {
          return (status >= 200 && status <= 302) || status == 404;
        },
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  let nextStep = () => {
    switch (form.currentPage) {
      case 0:
        var projectNameInvalid = project.name == "" ? true : false;
        var repositoryOwnerInvalid =
          project.github.repoOwner == "" ? true : false;
        var repositoryNameInvalid =
          project.github.repoName == "" ? true : false;

        // TODO: Make request to GitHub API to validate repo details
        getProject().then((data) => {
          if (data.status == 404) {
            repositoryNameInvalid = true;
            repositoryOwnerInvalid = true;
            updateForm((previous) => ({
              ...previous,
              error:
                "Please ensure the details of your GitHub repository have been entered correctly.",
            }));
          } else {
            repositoryNameInvalid = false;
            repositoryOwnerInvalid = false;
            updateForm((previous) => ({
              ...previous,
              error: "",
            }));
          }
          updateFieldInvalid({
            projectName: projectNameInvalid,
            repositoryOwner: repositoryOwnerInvalid,
            repositoryName: repositoryNameInvalid,
          });
          if (
            !projectNameInvalid &&
            !repositoryNameInvalid &&
            !repositoryOwnerInvalid
          ) {
            updateForm((previous) => ({
              ...previous,
              currentPage: form.currentPage + 1,
              progress:
                Math.floor(((form.currentPage + 1) / 3) * 100).toString() + "%",
            }));
          }
        });
        break;

      case 1:
        var tokenNameInvalid = project.token.name == "" ? true : false;
        var tokenSymbolInvalid = project.token.symbol == "" ? true : false;
        var tokenPriceInvalid = project.token.price == null ? true : false;
        var tokenSupplyInvalid =
          project.token.totalSupply == null ? true : false;
        var maintainerAllocationInvalid =
          form.maintainerAllocation == null ? true : false;

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
          updateForm((previous) => ({
            ...previous,
            currentPage: form.currentPage + 1,
            progress:
              Math.floor(((form.currentPage + 1) / 3) * 100).toString() + "%",
          }));
        }
        break;
    }
  };

  let prevStep = () => {
    if (form.currentPage > 0) {
      updateForm((previous) => ({
        ...previous,
        currentPage: form.currentPage - 1,
        progress:
          Math.floor(((form.currentPage - 1) / 3) * 100).toString() + "%",
      }));
    }
  };

  let launchProject = () => {
    let url = `http://${process.env.REACT_APP_BACKEND_URL}/api/user/project`;
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios.post(url, project, headers).then(
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
                    form={form}
                    updateForm={updateForm}
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
