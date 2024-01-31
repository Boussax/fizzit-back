import app from "../app";
import request from "supertest";

describe("Ferment Endpoints", () => {
  it("GET /ferments should show all ferments", async () => {
    const res = await request(app).get("/ferments");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });

  it("GET /ferments/:id should show a ferment", async () => {
    const res = await request(app).get("/ferments/3");
    expect(res.statusCode).toEqual(200);
  });

  it("POST /ferments should create a ferment", async () => {
    const res = await request(app).post("/ferments").send({
      name: "randName",
      type: "Ginger Ale",
      startDate: 12042024,
      fermentationDuration: 5,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.type).toBe("Ginger Ale");
  });

  it("DELETE /ferments/:id should delete a ferment", async () => {
    const res = await request(app).delete("/ferments/1");
    expect(res.statusCode).toEqual(200);
  });
});
