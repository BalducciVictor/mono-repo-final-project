import {
  INestApplication,
  HttpStatus,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AuthService } from "../../../src/domain/services/auth.service";
import { AppModule } from "../../../src/infrastructure/config/modules/app.module";
import request from "supertest";
import { adminCredentials, validUserData } from "../utils/test-data";

describe("AuthController (e2e)", () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useValue({
        signIn: jest.fn(),
      })
      .compile();

    app = module.createNestApplication();
    await app.init();
    authService = module.get<AuthService>(AuthService);
  }, 10000);

  it(`/POST auth/signin (Success scenario)`, async () => {
    const mockResponse = {
      user: validUserData,
      accessToken: "someToken",
    };

    (authService.signIn as jest.Mock).mockResolvedValue(mockResponse);

    await request(app.getHttpServer())
      .post("/auth/signin")
      .send(adminCredentials)
      .expect(HttpStatus.CREATED);

    expect(HttpStatus.OK).toEqual(200);
  });

  it(`/POST auth/signin (Unauthorized scenario)`, async () => {
    const mockUser = {
      email: "admintest@example.com",
      password: "invalidPassword",
    };

    (authService.signIn as jest.Mock).mockRejectedValue(
      new UnauthorizedException()
    );

    await request(app.getHttpServer())
      .post("/auth/signin")
      .send(mockUser)
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it(`/POST auth/signin (Not Found scenario)`, async () => {
    const mockUser = {
      email: "notfound@example.co",
      password: "string",
    };

    (authService.signIn as jest.Mock).mockRejectedValue(
      new NotFoundException()
    );

    await request(app.getHttpServer())
      .post("/auth/signin")
      .send(mockUser)
      .expect(HttpStatus.NOT_FOUND);
  });

  afterAll(async () => {
    await app.close();
  });
});
