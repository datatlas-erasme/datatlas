import type { CreateProjectDto, UpdateProjectDto } from '@datatlas/dtos';

describe('PROJECT ACTIONS', () => {
  // DATA
  let jwtAdmin;
  let jwtEditor;
  let idAdmin;
  const fakeProject = {
    title: 'string',
    draft: true,
    datasets: [],
    description: 'string',
    contributors: [],
    config: {
      mapState: {
        bearing: 0,
        dragRotate: false,
        isSplit: false,
        latitude: 45.758507,
        longitude: 4.852149,
        pitch: 0,
        zoom: 9,
      },
      mapStyle: {
        mapStyles: {
          dark: {
            id: 'dark',
            label: 'Dark',
            url: 'mapbox://styles/uberdata/cjoqbbf6l9k302sl96tyvka09',
            icon: 'https://d1a3f4spazzrp4.cloudfront.net/kepler.gl/geodude/UBER_DARK_V2.png',
            layerGroups: [
              {
                slug: 'label',
                defaultVisibility: true,
              },
              {
                slug: 'road',
                defaultVisibility: true,
              },
              {
                slug: 'border',
                defaultVisibility: false,
              },
              {
                slug: 'building',
                defaultVisibility: true,
              },
              {
                slug: 'water',
                defaultVisibility: true,
              },
              {
                slug: 'land',
                defaultVisibility: true,
              },
              {
                slug: '3d building',
                defaultVisibility: false,
              },
            ],
            custom: false,
          },
          light: {
            id: 'light',
            label: 'Light',
            url: 'mapbox://styles/uberdata/cjoqb9j339k1f2sl9t5ic5bn4',
            icon: 'https://d1a3f4spazzrp4.cloudfront.net/kepler.gl/geodude/UBER_LIGHT_V2.png',
            layerGroups: [
              {
                slug: 'label',
                defaultVisibility: true,
              },
              {
                slug: 'road',
                defaultVisibility: true,
              },
              {
                slug: 'border',
                defaultVisibility: false,
              },
              {
                slug: 'building',
                defaultVisibility: true,
              },
              {
                slug: 'water',
                defaultVisibility: true,
              },
              {
                slug: 'land',
                defaultVisibility: true,
              },
              {
                slug: '3d building',
                defaultVisibility: false,
              },
            ],
            custom: false,
          },
          muted: {
            id: 'muted',
            label: 'Muted Light',
            url: 'mapbox://styles/uberdata/cjfyl03kp1tul2smf5v2tbdd4',
            icon: 'https://d1a3f4spazzrp4.cloudfront.net/kepler.gl/geodude/UBER_MUTED_LIGHT.png',
            layerGroups: [
              {
                slug: 'label',
                defaultVisibility: true,
              },
              {
                slug: 'road',
                defaultVisibility: true,
              },
              {
                slug: 'border',
                defaultVisibility: false,
              },
              {
                slug: 'building',
                defaultVisibility: true,
              },
              {
                slug: 'water',
                defaultVisibility: true,
              },
              {
                slug: 'land',
                defaultVisibility: true,
              },
              {
                slug: '3d building',
                defaultVisibility: false,
              },
            ],
            custom: false,
          },
          muted_night: {
            id: 'muted_night',
            label: 'Muted Night',
            url: 'mapbox://styles/uberdata/cjfxhlikmaj1b2soyzevnywgs',
            icon: 'https://d1a3f4spazzrp4.cloudfront.net/kepler.gl/geodude/UBER_MUTED_NIGHT.png',
            layerGroups: [
              {
                slug: 'label',
                defaultVisibility: true,
              },
              {
                slug: 'road',
                defaultVisibility: true,
              },
              {
                slug: 'border',
                defaultVisibility: false,
              },
              {
                slug: 'building',
                defaultVisibility: true,
              },
              {
                slug: 'water',
                defaultVisibility: true,
              },
              {
                slug: 'land',
                defaultVisibility: true,
              },
              {
                slug: '3d building',
                defaultVisibility: false,
              },
            ],
            custom: false,
          },
          satellite: {
            id: 'satellite',
            label: 'Satellite',
            url: 'mapbox://styles/mapbox/satellite-v9',
            icon: 'https://d1a3f4spazzrp4.cloudfront.net/kepler.gl/geodude/UBER_SATELLITE.png',
            layerGroups: [],
            custom: false,
          },
        },
        styleType: 'dark',
        topLayerGroups: {},
        threeDBuildingColor: [209, 206, 199],
        visibleLayerGroups: {},
      },
      visState: {
        filters: [],
        layerBlending: 'normal',
        layers: [],
        splitMaps: [],
        animationConfig: {
          domain: null,
          currentTime: null,
          speed: 1,
          isAnimating: false,
          timeFormat: null,
          timezone: null,
          defaultTimeFormat: null,
        },
        interactionConfig: {
          tooltip: {
            id: 'tooltip',
            label: 'interactions.tooltip',
            enabled: true,
            config: {
              fieldsToShow: {},
              compareMode: false,
              compareType: 'absolute',
            },
          },
          geocoder: {
            id: 'geocoder',
            label: 'interactions.geocoder',
            enabled: false,
            position: null,
          },
          brush: {
            id: 'brush',
            label: 'interactions.brush',
            enabled: false,
            config: {
              size: 0.5,
            },
          },
          coordinate: {
            id: 'coordinate',
            label: 'interactions.coordinate',
            enabled: false,
            position: null,
          },
        },
      },
    },
    version: 'v1',
  };
  let fakeProject2 = {
    id: 2,
    title: 'string',
    draft: true,
    datasets: [{}],
    description: 'string',
    ownerId: 3,
    contributors: [1],
    config: {
      mapState: {
        bearing: 0,
        dragRotate: false,
        isSplit: false,
        latitude: 45.758507,
        longitude: 4.852149,
        pitch: 0,
        zoom: 9,
      },
      mapStyle: {
        mapStyles: {
          dark: {
            id: 'dark',
            label: 'Dark',
            url: 'mapbox://styles/uberdata/cjoqbbf6l9k302sl96tyvka09',
            icon: 'https://d1a3f4spazzrp4.cloudfront.net/kepler.gl/geodude/UBER_DARK_V2.png',
            layerGroups: [
              {
                slug: 'label',
                defaultVisibility: true,
              },
              {
                slug: 'road',
                defaultVisibility: true,
              },
              {
                slug: 'border',
                defaultVisibility: false,
              },
              {
                slug: 'building',
                defaultVisibility: true,
              },
              {
                slug: 'water',
                defaultVisibility: true,
              },
              {
                slug: 'land',
                defaultVisibility: true,
              },
              {
                slug: '3d building',
                defaultVisibility: false,
              },
            ],
            custom: false,
          },
          light: {
            id: 'light',
            label: 'Light',
            url: 'mapbox://styles/uberdata/cjoqb9j339k1f2sl9t5ic5bn4',
            icon: 'https://d1a3f4spazzrp4.cloudfront.net/kepler.gl/geodude/UBER_LIGHT_V2.png',
            layerGroups: [
              {
                slug: 'label',
                defaultVisibility: true,
              },
              {
                slug: 'road',
                defaultVisibility: true,
              },
              {
                slug: 'border',
                defaultVisibility: false,
              },
              {
                slug: 'building',
                defaultVisibility: true,
              },
              {
                slug: 'water',
                defaultVisibility: true,
              },
              {
                slug: 'land',
                defaultVisibility: true,
              },
              {
                slug: '3d building',
                defaultVisibility: false,
              },
            ],
            custom: false,
          },
          muted: {
            id: 'muted',
            label: 'Muted Light',
            url: 'mapbox://styles/uberdata/cjfyl03kp1tul2smf5v2tbdd4',
            icon: 'https://d1a3f4spazzrp4.cloudfront.net/kepler.gl/geodude/UBER_MUTED_LIGHT.png',
            layerGroups: [
              {
                slug: 'label',
                defaultVisibility: true,
              },
              {
                slug: 'road',
                defaultVisibility: true,
              },
              {
                slug: 'border',
                defaultVisibility: false,
              },
              {
                slug: 'building',
                defaultVisibility: true,
              },
              {
                slug: 'water',
                defaultVisibility: true,
              },
              {
                slug: 'land',
                defaultVisibility: true,
              },
              {
                slug: '3d building',
                defaultVisibility: false,
              },
            ],
            custom: false,
          },
          muted_night: {
            id: 'muted_night',
            label: 'Muted Night',
            url: 'mapbox://styles/uberdata/cjfxhlikmaj1b2soyzevnywgs',
            icon: 'https://d1a3f4spazzrp4.cloudfront.net/kepler.gl/geodude/UBER_MUTED_NIGHT.png',
            layerGroups: [
              {
                slug: 'label',
                defaultVisibility: true,
              },
              {
                slug: 'road',
                defaultVisibility: true,
              },
              {
                slug: 'border',
                defaultVisibility: false,
              },
              {
                slug: 'building',
                defaultVisibility: true,
              },
              {
                slug: 'water',
                defaultVisibility: true,
              },
              {
                slug: 'land',
                defaultVisibility: true,
              },
              {
                slug: '3d building',
                defaultVisibility: false,
              },
            ],
            custom: false,
          },
          satellite: {
            id: 'satellite',
            label: 'Satellite',
            url: 'mapbox://styles/mapbox/satellite-v9',
            icon: 'https://d1a3f4spazzrp4.cloudfront.net/kepler.gl/geodude/UBER_SATELLITE.png',
            layerGroups: [],
            custom: false,
          },
        },
        styleType: 'dark',
        topLayerGroups: {},
        threeDBuildingColor: [209, 206, 199],
        visibleLayerGroups: {},
      },
      visState: {
        filters: [],
        layerBlending: 'normal',
        layers: [],
        splitMaps: [],
        animationConfig: {
          domain: null,
          currentTime: null,
          speed: 1,
          isAnimating: false,
          timeFormat: null,
          timezone: null,
          defaultTimeFormat: null,
        },
        interactionConfig: {
          tooltip: {
            id: 'tooltip',
            label: 'interactions.tooltip',
            enabled: true,
            config: {
              fieldsToShow: {},
              compareMode: false,
              compareType: 'absolute',
            },
          },
          geocoder: {
            id: 'geocoder',
            label: 'interactions.geocoder',
            enabled: false,
            position: null,
          },
          brush: {
            id: 'brush',
            label: 'interactions.brush',
            enabled: false,
            config: {
              size: 0.5,
            },
          },
          coordinate: {
            id: 'coordinate',
            label: 'interactions.coordinate',
            enabled: false,
            position: null,
          },
        },
      },
    },
    version: 'v1',
  };

  let fakeProjectId;

  // AUTHENTICATION
  it('Connecting correctly with admin user.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'admin@example.org',
        password: 'admin',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
      jwtAdmin = response.body.access_token;
      idAdmin = response.body.id;
    });
  });
  it('Connecting correctly with editor user.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'editor@example.org',
        password: 'editor',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
      jwtEditor = response.body.access_token;
    });
  });

  // CREATE
  it('Should fail when creating new project without authentication.', () => {
    cy.request({
      method: 'POST',
      url: '/api/projects/',
      body: fakeProject,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Should fail when creating new project with empty jwt.', () => {
    cy.request({
      method: 'POST',
      url: '/api/projects/',
      body: fakeProject,
      auth: {
        bearer: '',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Should not fail when creating a project as an admin.', () => {
    cy.request({
      method: 'POST',
      url: '/api/projects',
      body: fakeProject,
      auth: {
        bearer: jwtAdmin,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
      fakeProjectId = response.body.id;
    });
  });
  it('Should not fail when creating a project as an editor.', () => {
    cy.request({
      method: 'POST',
      url: '/api/projects',
      body: fakeProject,
      auth: {
        bearer: jwtEditor,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  // READ TODO waiting for answers about granularity af reading rights.
  it('Should not fail when requesting projects.', () => {
    cy.request({
      method: 'GET',
      url: '/api/projects',
      auth: {
        bearer: jwtEditor,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });
  it('Should not fail when requesting a project.', () => {
    cy.request({
      method: 'GET',
      url: `/api/projects/${fakeProjectId}`,
      auth: {
        bearer: jwtEditor,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(fakeProjectId);
    });
  });

  // UODATE
  it('Should not fail when updating owned project as admin.', () => {
    fakeProject2.id = fakeProjectId;
    cy.request({
      method: 'PUT',
      url: `/api/projects/${String(fakeProjectId)}`,
      body: fakeProject2,
      auth: {
        bearer: jwtAdmin,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(fakeProjectId);
    });
  });

  // DELETE
  it('Should ot fail when trying to delete project as admin', () => {
    cy.request({
      method: 'DELETE',
      url: `/api/projects/${fakeProjectId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('string');
    });
  });
});
