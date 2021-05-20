describe("Navigation", () => {
	it("should visit root", () => {
		cy.visit("/");
	});
	it("it should navigate to Tuesday", () => {
		cy.visit("/");
		cy.get("[data-testid=day]")
			.contains("[data-testid=day]", "Tuesday")
			.click()
			.should("have.class", "day-list__item--selected");
	});
});
