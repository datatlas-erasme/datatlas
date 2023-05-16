import type { CreateProjectDto, UpdateProjectDto } from '@datatlas/dtos';

describe('PROJECT ACTIONS', () => {
  // DATA
  let jwtAdmin;
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
  // AUTHENTICATION
  it('Auth -> Connecting correctly with admin user.', () => {
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
      jwtAdmin = response.body.addess_token;
    });
  });

  // CREATE
  it('Project -> creation of new project without authentication-> should fail.', () => {
    cy.request({
      method: 'POST',
      url: '/api/projects/',
      body: fakeProject /*
      auth: {
        bearer: jwtUserAdmin,
      },*/,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Project -> creation of new project with empty jwt -> should fail.', () => {
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

  /*
  const testCreateProject: CreateProjectDto = {
    title: 'titre projet test 2',
    draft: true,
    datasets: [],
    description: 'description du projet 2',
    config: undefined,
    version: 'v1' as const,
    contributors: [63, 64], // Shall we really send IDs ? Maybe usernames instead ?
  };
  const testUpdateProjectDto: UpdateProjectDto = {
    id: 1,
    title: 'titre projet test 2_',
    draft: false,
    datasets: [],
    description: 'description du projet 2_',
    config: undefined,
    version: 'v1' as const,
    ownerId: 1,
    contributors: [63], // Shall we really send IDs ? Maybe usernames instead ?
  };
  let jwtUserAdmin;
  let idUserAdmin;

  it('Project -> creation of new project -> should not fail.', () => {
    cy.request({
      method: 'POST',
      url: '/api/projects',
      body: testCreateProject,
      auth: {
        bearer: jwtUserAdmin,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
  it('Project -> get all projects -> should not fail.', () => {
    cy.request({
      method: 'GET',
      url: '/api/projects',
      auth: {
        bearer: jwtUserAdmin,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });
  it('Project -> Get info about project using id', () => {
    cy.request({
      method: 'GET',
      url: `/api/projects/${String(testUpdateProjectDto.id)}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      // should return an object with the project info
      expect(response.body).to.be.an('object');
    });
  });
  it('Project -> Modification', () => {
    cy.request({
      method: 'PUT',
      url: `/api/projects/${String(testUpdateProjectDto.id)}`,
      body: testUpdateProjectDto,
      auth: {
        bearer: jwtUserAdmin,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it('Project -> Delete', () => {
    cy.request({
      method: 'DELETE',
      url: `/api/projects/${String(1)}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('string');
    });
  });*/
});
