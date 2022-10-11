import { productsURL, FoodProduct, Customer, customersURL } from "../lib";

interface HasId {
    id: number
}

// Generic class with custom contraint (HasId)
class GenericModel<T extends HasId> {
    public items: T[] | undefined
    constructor(public url: string) { }

    async getItems(): Promise<T[]> {
        this.items = await getList<T>(this.url);
        return this.items;
    }

    getItemById(id: number): T | undefined {
        return this.items ? this.items?.find((p) => id = p.id) : undefined;
    }
}

const foodModel: GenericModel<FoodProduct> = new GenericModel<FoodProduct>(productsURL);

export default async function updateOutput(id: string = 'output') {
    // const products = await getProducts();
    // const products = await getList<FoodProduct>(productsURL);
    const products = await foodModel.getItems()

    const output = document.querySelector(`#${id}`);
    const html = layoutProducts(products);

    if (output && html) {
        // checkout the code 
    }
}

// function layoutProducts(products: FoodProduct[]): string {}

async function getProducts(): Promise<FoodProduct[]> {
    const response: Response = await fetch(productsURL);
    const products: FoodProduct[] = await response.json();
    return products;
}

async function getList<T>(url: string): Promise<T[]> {
    const response: Response = await fetch(url);
    const items: T[] = await response.json();
    return items;
}

/****************************************
*Learning Sample Code
*****************************************/

runTheLearningSample();

async function runTheLearningSample() {
    function whatIsIt_number(arg: number): number {
        return arg;
    }

    function whatIsIt_string(arg: string): string {
        return arg;
    }

    function whatIsIt_any(arg: any): any {
        return arg;
    }

    // console.log(whatIsIt_number(11));
    // console.log(whatIsIt_string("string"));

    console.log(whatIsIt_any(11));
    console.log(whatIsIt_any("string"));

    function whatIsIt_typed<T>(arg: T): T {
        return arg;
    }

    let n = whatIsIt_typed<number>(11)
    let s = whatIsIt_typed<string>('Damaris')
    let b = whatIsIt_typed<boolean>(true)

    console.log(n, s, b);

    async function getData() {
        const products = await getList<FoodProduct>(productsURL);
        console.table(products);


        const customers = await getList<Customer>(customersURL);
        console.table(customers);
    }
    await getData();

    interface Model<T> {
        items: T[] | undefined;
        getItems: () => Promise<T[]>;
        getItemById: (id: number) => T | undefined
    }

    class FoodModel implements Model<FoodProduct> {
        public items: FoodProduct[] | undefined;

        async getItems(): Promise<FoodProduct[]> {
            this.items = await getList<FoodProduct>(productsURL);
            return this.items;
        }

        getItemById(id: number): FoodProduct | undefined {
            return this.items ? this.items?.find((p) => id = p.id) : undefined;
        }
    }

    const foodModel: FoodModel = new FoodModel();
    await foodModel.getItems();

    console.table(foodModel.items);


    // Generic class
    const genericFoodModel: GenericModel<FoodProduct> = new GenericModel<FoodProduct>(productsURL);
    const genericCustomerModel: GenericModel<Customer> = new GenericModel<Customer>(customersURL);

    await genericFoodModel.getItems();
    await genericCustomerModel.getItems();
    console.log(genericFoodModel.items);
    console.log(genericCustomerModel.items);

    // Built-in Constraints
    const model: FoodModel = new FoodModel();
    await model.getItems();
    // make foodItem readonly
    const foodItem: Readonly<FoodProduct | undefined> = model.getItemById(10);
    if(foodItem) {
        // foodItem.name = 'some name';
        // foodItem.icon = 'some icon';
    }

    const pear = {name: 'pear'};
    // const pearFood: FoodProduct = pear;
    const pearFood: Partial<FoodProduct> = pear;
}