module counter::counter {
    use std::vector;
    use sui::tx_context::{TxContext, sender};
    use sui::object;
    use sui::transfer;

    struct Counter has key, store {
        id: UID,
        value: u64,
        owner: address,
    }

    struct Registry has key {
        id: UID,
        counters: vector<address>, // store object IDs of counters
    }

    /// Initialize registry (run once after deployment)
    public entry fun init(ctx: &mut TxContext) {
        let registry = Registry {
            id: object::new(ctx),
            counters: vector::empty<address>(),
        };
        transfer::share_object(registry);
    }

    /// Create a new counter and register it
    public entry fun create_counter(registry: &mut Registry, ctx: &mut TxContext) {
        let counter = Counter {
            id: object::new(ctx),
            value: 0,
            owner: sender(ctx),
        };

        let counter_id = object::id(&counter);
        vector::push_back(&mut registry.counters, counter_id);

        transfer::share_object(counter);
    }

    public entry fun increment(counter: &mut Counter) {
        counter.value = counter.value + 1;
    }

    public entry fun reset(counter: &mut Counter, ctx: &TxContext) {
        assert!(counter.owner == sender(ctx), 1);
        counter.value = 0;
    }
}
